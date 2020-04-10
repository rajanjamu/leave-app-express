Leave application for our business

MODELS
------
User: {
    username: String,
    password: String,
    role: String, (Manager/Employee)
    status: Boolean, (User Approval)
    created: Date
}

Leave: {
    type: String, (Sick, Casual, Other)
    dateFrom: Date,
    dateTo: Date,
    reason: String,
    status: String, (Pending, Accepted, Rejected)
    created: Date
}


FLOW
------
