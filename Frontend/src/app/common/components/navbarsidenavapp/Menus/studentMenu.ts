export const studentMenu = [
    {
        name: "Dashboard",
        route: "/dashboard",
        icon: "space_dashboard",
        allowedUserTypes: []
    },
    {
        name: "Structure",
        icon: "account_tree",
        allowedUserTypes: [6, 7],
        children: [
            {
                name: "View Syllabus",
                route: "/structure/view",
                icon: "view_list",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Timetable",
        icon: "table_view",
        allowedUserTypes: [6, 7],
        children: [
            {
                name: "View",
                route: "/timetable/view",
                icon: "view_list",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Attendence",
        icon: "list_alt",
        allowedUserTypes: [6, 7],
        children: [
            {
                name: "View",
                route: "/attendence/view",
                icon: "view_list",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Library",
        icon: "local_library",
        allowedUserTypes: [6, 7],
        children: [
            {
                name: "View Stock",
                route: "/library/viewstock",
                icon: "view_list",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Payments",
        icon: "calculate",
        allowedUserTypes: [6, 7],
        children: [
            {
                name: "Pending Payments",
                route: "/accounts/payments",
                icon: "pending",
                allowedUserTypes: []
            },
            {
                name: "Payment History",
                route: "/accounts/paymenthistory",
                icon: "history",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Study Material",
        icon: "books",
        allowedUserTypes: [1, 2, 3, 4, 5],
        children: [
            {
                name: "View",
                route: "/studymaterial/view",
                icon: "auto_stories",
                allowedUserTypes: []
            },
            {
                name: "Upload",
                route: "/studymaterial/upload",
                icon: "upload",
                allowedUserTypes: []
            },
        ]
    }
]