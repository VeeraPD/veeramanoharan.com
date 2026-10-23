"""Compose an original, sample-free instrumental and duck it under narration."""
import hashlib
import json
import math
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from scripts.edit_demo_video import OUT, FFMPEG, duration

MUSIC = OUT / "music"
TRACK = MUSIC / "clearer-path-original.wav"
VERSION = 1


def compose():
    MUSIC.mkdir(exist_ok=True)
    metadata=MUSIC/"provenance.json"
    if TRACK.exists() and metadata.exists() and json.loads(metadata.read_text())["version"]==VERSION:
        return TRACK
    sr=44100;seconds=240;beat=60/92;bar=beat*4
    audio=np.zeros((sr*seconds,2),dtype=np.float32)
    rng=np.random.default_rng(7526)
    chords=[(40,[55,59,62,66]),(36,[55,60,64,67]),(43,[54,59,62,67]),(38,[57,62,64,69])]

    def note(start,midi,length,gain,pan=0,pad=False):
        begin=round(start*sr);count=min(round(length*sr),len(audio)-begin)
        if count<=0:return
        t=np.arange(count,dtype=np.float32)/sr
        freq=440*2**((midi-69)/12)
        if pad:
            env=np.minimum(t/.85,1)*np.minimum((length-t)/1.4,1)
            signal=(np.sin(2*np.pi*freq*t)+.22*np.sin(2*np.pi*freq*2*t)+.12*np.sin(2*np.pi*freq*1.0015*t+.8))*env
        else:
            env=(1-np.exp(-t*100))*np.exp(-t*2.1)*np.minimum((length-t)/.12,1)
            signal=(np.sin(2*np.pi*freq*t)+.3*np.sin(2*np.pi*freq*2*t)*np.exp(-t*3)+.09*np.sin(2*np.pi*freq*3*t)*np.exp(-t*5))*env
        left=math.sqrt((1-pan)/2);right=math.sqrt((1+pan)/2)
        audio[begin:begin+count,0]+=signal*gain*left
        audio[begin:begin+count,1]+=signal*gain*right

    for section in range(math.ceil(seconds/(2*bar))):
        start=section*2*bar;bass,voicing=chords[section%4]
        for i,pitch in enumerate(voicing):
            note(start,pitch,2*bar+1.0,.065,(i-1.5)/2.3,pad=True)
        for i in range(4):note(start+i*2*beat,bass,1.7,.13,0)
        pattern=[0,2,1,3,2,1,3,2]
        for i,index in enumerate(pattern):
            note(start+(i+.5)*beat,voicing[index]+12,2.4,.047 if i%2==0 else .034,(-.45 if i%2 else .45))
        # A quiet synthesized shaker; no prerecorded drum samples.
        for i in range(16):
            pos=round((start+i*beat/2)*sr);n=min(round(sr*.09),len(audio)-pos)
            if n<=0:continue
            noise=rng.normal(0,1,n+1).astype(np.float32)
            hit=np.diff(noise)*np.exp(-np.arange(n)/(sr*.018))*.0025
            audio[pos:pos+n,0]+=hit*.65;audio[pos:pos+n,1]+=hit*.8
    fade=round(sr*2)
    audio[:fade]*=np.linspace(0,1,fade,dtype=np.float32)[:,None]
    audio[-fade:]*=np.linspace(1,0,fade,dtype=np.float32)[:,None]
    rms=float(np.sqrt(np.mean(audio**2)))
    audio*=10**(-18/20)/rms
    peak=float(np.max(np.abs(audio)))
    if peak>.88:audio*=.88/peak
    pcm=(np.clip(audio,-1,1)*32767).astype('<i2')
    with wave.open(str(TRACK),'wb') as output:
        output.setnchannels(2);output.setsampwidth(2);output.setframerate(sr);output.writeframes(pcm.tobytes())
    metadata.write_text(json.dumps(dict(version=VERSION,title="Clearer Path",type="Original procedural instrumental",seconds=seconds,bpm=92,sample_rate=sr,
        instruments="Sine-based warm pads, plucked tones, bass and synthesized noise shaker",external_assets=[],
        usage="Created for this project; may be used, edited and distributed with no attribution requested. No third-party recording, melody, sample or loop was used.",
        sha256=hashlib.sha256(TRACK.read_bytes()).hexdigest()),indent=2),encoding="utf-8")
    print("Composed original instrumental",flush=True)
    return TRACK


def add_music(video,seconds=None):
    video=Path(video);seconds=seconds or duration(video)
    track=compose();mixed=video.with_name(video.stem+"-mixed.mp4")
    graph=("[0:a]aformat=sample_rates=48000:channel_layouts=stereo,asplit=2[voice][key];"
           f"[1:a]atrim=duration={seconds},asetpts=PTS-STARTPTS,volume=0.18,afade=t=in:st=0:d=1.4,afade=t=out:st={seconds-1.8}:d=1.8[bed];"
           "[bed][key]sidechaincompress=threshold=0.025:ratio=6:attack=30:release=450[ducked];"
           "[voice][ducked]amix=inputs=2:duration=first:normalize=0,volume=1.4125375,alimiter=limit=0.891:level=false:latency=true[mix]")
    subprocess.run([FFMPEG,"-y","-v","error","-i",str(video),"-i",str(track),"-filter_complex",graph,
                    "-map","0:v","-map","[mix]","-c:v","copy","-c:a","aac","-b:a","160k","-t",str(seconds),"-movflags","+faststart",str(mixed)],check=True)
    mixed.replace(video)
    print("Mixed quiet music beneath narration:",video.name,flush=True)


if __name__=="__main__":compose()
