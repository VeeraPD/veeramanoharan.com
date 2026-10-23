"""Transparent, scenario-based value model. Currency is USD throughout."""


def business_case(handoffs, annual_tickets=20000, reduction=.25, active_minutes=10., hourly_cost=45., review_rate=.20, review_minutes=5., build_cost=12000., monthly_platform=150., monthly_model=100., monthly_operations=300.):
    if not 0 <= reduction <= 1 or not 0 <= review_rate <= 1:
        raise ValueError("Reduction and review rates must be between zero and one.")
    if any(v < 0 for v in (handoffs, annual_tickets, active_minutes, hourly_cost, review_minutes, build_cost, monthly_platform, monthly_model, monthly_operations)):
        raise ValueError("Costs, volumes and time inputs must be non-negative.")
    annual_current_labor_cost = annual_tickets*handoffs*active_minutes/60*hourly_cost
    avoided = annual_tickets*handoffs*reduction
    gross_hours = avoided*active_minutes/60
    review_hours = annual_tickets*review_rate*review_minutes/60
    net_hours = gross_hours-review_hours
    annual_run_cost = 12*(monthly_platform+monthly_model+monthly_operations)
    annual_net = net_hours*hourly_cost-annual_run_cost
    return dict(currency="USD", annual_tickets=annual_tickets, observed_handoffs_per_case=handoffs, assumed_reduction=reduction,
                active_minutes=active_minutes, hourly_cost=hourly_cost, assumed_review_rate=review_rate, review_minutes=review_minutes,
                build_cost=build_cost, monthly_platform=monthly_platform, monthly_model=monthly_model, monthly_operations=monthly_operations,
                modeled_current_annual_handoff_labor_cost=annual_current_labor_cost, annual_avoided_handoffs=avoided,
                gross_labor_hours_saved=gross_hours, annual_review_hours=review_hours, net_labor_hours_saved=net_hours,
                annual_run_cost=annual_run_cost, year_one_tco=build_cost+annual_run_cost, annual_net_value=annual_net,
                year_one_net_value=annual_net-build_cost, payback_months=build_cost/(annual_net/12) if annual_net>0 else None)
