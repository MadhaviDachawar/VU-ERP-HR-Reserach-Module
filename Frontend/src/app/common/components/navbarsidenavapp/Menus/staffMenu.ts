export const staffMenu = [
    {
        name: "Dashboard",
        route: "/dashboard",
        icon: "space_dashboard",
        allowedUserTypes: []
    },
    {
        name: "Staff",
        icon: "supervised_user_circle",
        allowedUserTypes: [1, 2, 3, 4, 5],
        children: [
            {
                name: "View All",
                route: "/staff/view",
                icon: "view_list",
                allowedUserTypes: []
            },
            {
                name: "Add",
                route: "/staff/add",
                icon: "person_add_alt",
                id: 11,
                allowedUserTypes: []
            },
            // {
            //     name: "Add Others Faculty Members",
            //     route: "/staff_NonTeaching/add_otherfaculty",
            //     icon: "person_add_alt",
            //     id: 12,
            //     allowedUserTypes: []
            // },
            {
                name: "Add Non Teaching Staff",
                route: "/staff_NonTeaching/add",
                icon: "person_add_alt",
                id: 13,
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Student",
        icon: "people",
        allowedUserTypes: [1, 2, 3, 4, 5],
        children: [
            {
                name: "View",
                route: "/student/view",
                icon: "view_list",
                allowedUserTypes: []
            },
            {
                name: "Add",
                route: "/student/add",
                icon: "person_add_alt",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Timetable",
        icon: "table_view",
        allowedUserTypes: [1, 2, 3, 4, 5],
        children: [
            {
                name: "View",
                route: "/timetable/view",
                icon: "view_list",
                allowedUserTypes: []
            },
            {
                name: "Create",
                route: "/timetable/create",
                icon: "create",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Attendence",
        icon: "list_alt",
        allowedUserTypes: [1, 2, 3, 4, 5],
        children: [
            {
                name: "View",
                route: "/attendence/view",
                icon: "view_list",
                allowedUserTypes: []
            },
            {
                name: "Mark",
                route: "/attendence/mark",
                icon: "done_all",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Structure",
        icon: "account_tree",
        id: 3,
        allowedUserTypes: [1, 2, 3, 4, 5],
        children: [
            {
                name: "University Structure",
                route: "/structure/universitystructure",
                icon: "school",
                allowedUserTypes: []
            },
            {
                name: "Syllabus Structure",
                route: "/structure/syllabusstructure",
                icon: "menu_book",
                allowedUserTypes: [],
            },
        ]
    },
    {
        name: "Accounts",
        icon: "calculate",
        allowedUserTypes: [1, 2, 3, 4, 5],
        children: [
            {
                name: "Fee Structure",
                route: "/accounts/feestructure",
                icon: "account_tree",
                allowedUserTypes: []
            },
        ]
    },
    {
        name: "Payments",
        icon: "money",
        allowedUserTypes: [1, 2, 3, 4, 5],
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
        name: "Library",
        icon: "local_library",
        allowedUserTypes: [1, 2, 3, 4, 5],
        children: [
            {
                name: "View Stock",
                route: "/library/viewstock",
                icon: "view_list",
                allowedUserTypes: []
            },
            {
                name: "Issue Book(s)",
                route: "/library/issuebooks",
                icon: "done_all",
                allowedUserTypes: []
            },
            {
                name: "Return Book(s)",
                route: "/library/returnbooks",
                icon: "keyboard_return",
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