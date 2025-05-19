import { icons, images } from "../constants";

export const friends = [
    {
        id: "1",
        name: "Tynisa Obey",
        phoneNumber: "+1-300-400-0135",
        avatar: images.user1,
    },
    {
        id: "2",
        name: "Florencio Dorance",
        phoneNumber: "+1-309-900-0135",
        avatar: images.user2,
    },
    {
        id: "3",
        name: "Chantal Shelburne",
        phoneNumber: "+1-400-100-1009",
        avatar: images.user3,
    },
    {
        id: "4",
        name: "Maryland Winkles",
        phoneNumber: "+1-970-200-4550",
        avatar: images.user4,
    },
    {
        id: "5",
        name: "Rodolfo Goode",
        phoneNumber: "+1-100-200-9800",
        avatar: images.user5,
    },
    {
        id: "6",
        name: "Benny Spanbauer",
        phoneNumber: "+1-780-200-9800",
        avatar: images.user6,
    },
    {
        id: "7",
        name: "Tyra Dillon",
        phoneNumber: "+1-943-230-9899",
        avatar: images.user7,
    },
    {
        id: "8",
        name: "Jamel Eusobio",
        phoneNumber: "+1-900-234-9899",
        avatar: images.user8,
    },
    {
        id: "9",
        name: "Pedro Haurad",
        phoneNumber: "+1-240-234-9899",
        avatar: images.user9
    },
    {
        id: "10",
        name: "Clinton Mcclure",
        phoneNumber: "+1-500-234-4555",
        avatar: images.user10
    },
];

export const faqKeywords = [
    {
        id: "1",
        name: "General"
    },
    {
        id: "2",
        name: "Account"
    },
    {
        id: "3",
        name: "Security"
    },
    {
        id: "4",
        name: "Ordering"
    },
    {
        id: "5",
        name: "Payment"
    }
];

export const faqs = [
    {
        question: 'How do I place an order for pet food using the app?',
        answer: 'To place an order, simply open the app, browse through pet food options, select your desired products, add them to your cart, and proceed to checkout to confirm your order.',
        type: "General"
    },
    {
        question: 'Can I view details of pet food products, such as ingredients and nutritional information?',
        answer: 'Yes, you can view detailed product information including ingredients, nutritional values, allergens, and customer ratings. Simply select a product from the app.',
        type: "General"
    },
    {
        question: 'What should I do if I need to cancel or modify my pet food order?',
        answer: 'To cancel or modify an order, navigate to the "My Orders" section in the app, find your order, and follow the provided options to make changes.',
        type: "Account"
    },
    {
        question: 'How can I find pet food for specific dietary needs, such as grain-free or hypoallergenic options?',
        answer: 'Use the app’s search filters to find pet food tailored to specific dietary needs. You can filter products by categories such as grain-free, hypoallergenic, or specific nutritional requirements.',
        type: "Ordering"
    },
    {
        question: 'Is there a way to make payments for pet food orders within the app?',
        answer: 'Yes, you can securely make payments within the app using various payment methods, including credit/debit cards and digital wallets.',
        type: "Payment"
    },
    {
        question: 'Are my personal details and order information secure?',
        answer: 'Yes, we prioritize the security and confidentiality of your personal details and order information. Our app adheres to strict privacy and data protection standards.',
        type: "Security"
    },
    {
        question: 'Can I request additional assistance for special dietary requirements or preferences for my pet?',
        answer: "Yes, you can request assistance for special dietary requirements or preferences during the ordering process. Specify your pet's needs, and we'll do our best to accommodate them.",
        type: "General"
    },
    {
        question: 'How can I provide feedback or rate my pet food delivery experience?',
        answer: 'After receiving your order, you can provide feedback and rate your experience through the app’s rating and review system. Your feedback helps us enhance our service quality.',
        type: "General"
    },
    {
        question: 'Is customer support available through this pet food delivery app?',
        answer: 'Yes, customer support is accessible via the app. For assistance, please contact our support team through the designated support channels provided within the app.',
        type: "General"
    },
];

export const messsagesData = [
    {
        id: "1",
        fullName: "Jhon Smith",
        isOnline: false,
        userImg: images.user1,
        lastSeen: "2023-11-16T04:52:06.501Z",
        lastMessage: 'I love you. see you soon baby',
        messageInQueue: 2,
        lastMessageTime: "12:25 PM",
    },
    {
        id: "2",
        fullName: "Anuska Sharma",
        isOnline: false,
        userImg: images.user2,
        lastSeen: "2023-11-18T04:52:06.501Z",
        lastMessage: 'I Know. you are so busy man.',
        messageInQueue: 0,
        lastMessageTime: "12:15 PM",
    },
    {
        id: "3",
        fullName: "Virat Kohili",
        userImg: images.user3,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Ok, see u soon',
        messageInQueue: 0,
        lastMessageTime: "09:12 PM",
        isOnline: true
    },
    {
        id: "4",
        fullName: "Shikhor Dhaon",
        isOnline: false,
        userImg: images.user4,
        lastSeen: "2023-11-18T04:52:06.501Z",
        lastMessage: 'Great! Do you Love it.',
        messageInQueue: 0,
        lastMessageTime: "04:12 PM",
    },
    {
        id: "5",
        fullName: "Shakib Hasan",
        userImg: images.user5,
        lastSeen: "2023-11-21T04:52:06.501Z",
        lastMessage: 'Thank you !',
        messageInQueue: 2,
        lastMessageTime: "10:30 AM",
        isOnline: true
    },
    {
        id: "6",
        fullName: "Jacksoon",
        userImg: images.user6,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Do you want to go out dinner',
        messageInQueue: 3,
        lastMessageTime: "10:05 PM",
        isOnline: false
    },
    {
        id: "7",
        fullName: "Tom Jerry",
        userImg: images.user7,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Do you want to go out dinner',
        messageInQueue: 2,
        lastMessageTime: "11:05 PM",
        isOnline: true
    },
    {
        id: "8",
        fullName: "Lucky Luck",
        isOnline: false,
        userImg: images.user8,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Can you share the design with me?',
        messageInQueue: 2,
        lastMessageTime: "09:11 PM",
    },
    {
        id: "9",
        fullName: "Nate Jack",
        userImg: images.user9,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Tell me what you want?',
        messageInQueue: 0,
        lastMessageTime: "06:43 PM",
        isOnline: true
    }
];

export const callData = [
    {
        id: "1",
        fullName: "Roselle Erhman",
        userImg: images.user10,
        status: "Incoming",
        date: "Dec 19, 2024"
    },
    {
        id: "2",
        fullName: "Willard Purnell",
        userImg: images.user9,
        status: "Outgoing",
        date: "Dec 17, 2024"
    },
    {
        id: "3",
        fullName: "Charlotte Hanlin",
        userImg: images.user8,
        status: "Missed",
        date: "Dec 16, 2024"
    },
    {
        id: "4",
        fullName: "Merlin Kevin",
        userImg: images.user7,
        status: "Missed",
        date: "Dec 16, 2024"
    },
    {
        id: "5",
        fullName: "Lavern Laboy",
        userImg: images.user6,
        status: "Outgoing",
        date: "Dec 16, 2024"
    },
    {
        id: "6",
        fullName: "Phyllis Godley",
        userImg: images.user5,
        status: "Incoming",
        date: "Dec 15, 2024"
    },
    {
        id: "7",
        fullName: "Tyra Dillon",
        userImg: images.user4,
        status: "Outgoing",
        date: "Dec 15, 2024"
    },
    {
        id: "8",
        fullName: "Marci Center",
        userImg: images.user3,
        status: "Missed",
        date: "Dec 15, 2024"
    },
    {
        id: "9",
        fullName: "Clinton Mccure",
        userImg: images.user2,
        status: "Outgoing",
        date: "Dec 15, 2024"
    },
];

export const notifications = [
    {
        id: "1",
        icon: icons.chat,
        title: "Kathryn sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "2",
        icon: icons.box,
        title: "Congratulations! Order Successful!",
        description: "You have successfully ordered a pizza for $90. Enjoy the services!",
        date: "2024-01-23T04:52:06.501Z"
    },
    {
        id: "3",
        icon: icons.chat,
        title: "New Services Available!",
        description: "You can now make multiple order at once. You can also cancel your order.",
        date: "2024-01-23T08:52:06.501Z"
    },
    {
        id: "4",
        icon: icons.discount,
        title: "Get 20% Discount for your next order!",
        description: "For all orderings without requirements",
        date: "2024-01-28T08:52:06.501Z"
    },
    {
        id: "5",
        icon: icons.chat,
        title: "New Category foods available!",
        description: "We have added New Service. Enjoy our new service!",
        date: "2024-01-29T08:52:06.501Z"
    },
    {
        id: "6",
        icon: icons.box,
        title: "Credit card successfully connected!",
        description: "Credit card has been successfully linked!",
        date: "2024-01-23T04:52:06.501Z"
    },
    {
        id: "7",
        icon: icons.chat,
        title: "Julia sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "8",
        icon: icons.chat,
        title: "Joanna sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "9",
        icon: icons.chat,
        title: "Lilia sent you a message",
        description: "Tap to see the message",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "10",
        icon: icons.box,
        title: "Account Setup Successfully",
        description: "Your account has been created!",
        date: "2024-01-28T04:52:06.501Z"
    },
    {
        id: "11",
        icon: icons.discount,
        title: "Get 50% Discount for First Order!",
        description: "For all transaction without requirements",
        date: "2024-01-28T08:52:06.501Z"
    },
    {
        id: "12",
        icon: icons.chat,
        title: "Mily sent you a message",
        description: "Tap to see the message",
        date: "2024-01-31T04:52:06.501Z"
    },
];

export const userAddresses = [
    {
        id: "1",
        name: "Home",
        address: "364 Stillwater Ave, Attleboro, MA 02703",
    },
    {
        id: "2",
        name: "Office",
        address: "73 Virginia Rd, Cuyahoga Falls, OH 44221",
    },
    {
        id: "3",
        name: "Mall Plaza",
        address: "123 Main St, San Francisco, CA 94107",
    },
    {
        id: "4",
        name: "Garden Park",
        address: "600 Bloom St, Portland, OR 97201",
    },
    {
        id: "5",
        name: "Grand City Park",
        address: "26 State St Daphne, AL 36526"
    },
    {
        id: "6",
        name: "Town Square",
        address: "20 Applegate St. Hoboken, NJ 07030"
    },
    {
        id: "7",
        name: "Bank",
        address: "917 W Pine Street Easton, PA 0423"
    }
];

export const transactionHistory = [
    {
        id: "1",
        image: images.user1,
        name: "Daniel Austin",
        date: "Dec 20, 2024 | 10:00 AM",
        type: "Taxi Expense",
        amount: "$14"
    },
    {
        id: "2",
        image: images.user2,
        name: "Top Up Wallet",
        date: "Dec 16, 2024 | 13:34 PM",
        type: "Top Up",
        amount: "$80"
    },
    {
        id: "3",
        image: images.user3,
        name: "Sarah Wilson",
        date: "Dec 14, 2024 | 11:39 AM",
        type: "Taxi Expense",
        amount: "$32"
    },
    {
        id: "4",
        image: images.user2,
        name: "Daniel Austion",
        date: "Dec 10, 2024 | 09:32 AM",
        type: "Top Up",
        amount: "$112"
    },
    {
        id: "5",
        image: images.user5,
        name: "Benny Spanbauleur",
        date: "Dec 09, 2024 | 10:08 AM",
        type: "Taxi Expense",
        amount: "$43"
    },
    {
        id: "6",
        image: images.user6,
        name: "Roselle Dorrence",
        date: "Dec 08, 2024 | 09:12 AM",
        type: "Taxi Expense",
        amount: "$22"
    },
    {
        id: "7",
        image: images.user2,
        name: "Daniel Austion",
        date: "Dec 08, 2024 | 16:28 PM",
        type: "Top Up",
        amount: "$200"
    },
    {
        id: "8",
        image: images.user2,
        name: "Daniel Austion",
        date: "Dec 07, 2024 | 15:12 PM",
        type: "Top Up",
        amount: "$120"
    },
    {
        id: "9",
        image: images.user2,
        name: "Daniel Austion",
        date: "Dec 07, 2024 | 22:12 PM",
        type: "Top Up",
        amount: "$20"
    },
    {
        id: "10",
        image: images.user8,
        name: "Lucky Luck",
        date: "Dec 06, 2024 | 10:08 AM",
        type: "Taxi Expense",
        amount: "$12"
    },
    {
        id: "11",
        image: images.user2,
        name: "Jennifer Lucie",
        date: "Dec 03, 2024 | 11:48 AM",
        type: "Top Up",
        amount: "$45"
    }
];

export const banners = [
    {
        id: 1,
        discount: '40%',
        discountName: "Today's Special",
        bottomTitle: 'Get a discount for every orde!',
        bottomSubtitle: 'Only valid for today!'
    },
    {
        id: 2,
        discount: '50%',
        discountName: "Weekend Sale",
        bottomTitle: 'Special discount for weekend orderings!',
        bottomSubtitle: 'This weekend only!'
    },
    {
        id: 3,
        discount: '30%',
        discountName: "Limited Time Offer",
        bottomTitle: 'Hurry up! Limited time offer!',
        bottomSubtitle: 'Valid until supplies last!'
    }
];

export const categories = [
    {
        id: "1",
        name: "Dry Food",
        icon: icons.dryFood,
        iconColor: "rgba(51, 94, 247, 1)",
        backgroundColor: "rgba(51, 94, 247, .12)",
        onPress: null
    },
    {
        id: "2",
        name: "Wet Food",
        icon: icons.wetFood,
        iconColor: "rgba(255, 152, 31, 1)",
        backgroundColor: "rgba(255, 152, 31, .12)",
        onPress: null
    },
    {
        id: "3",
        name: "Treats",
        icon: icons.treats,
        iconColor: "rgba(26, 150, 240, 1)",
        backgroundColor: "rgba(26, 150, 240,.12)",
        onPress: null
    },
    {
        id: "4",
        name: "Supplements",
        icon: icons.supplements,
        iconColor: "rgba(255, 192, 45, 1)",
        backgroundColor: "rgba(255, 192, 45,.12)",
        onPress: null
    },
    {
        id: "5",
        name: "Organic",
        icon: icons.organic,
        iconColor: "rgba(245, 67, 54, 1)",
        backgroundColor: "rgba(245, 67, 54,.12)",
        onPress: null
    },
    {
        id: "6",
        name: "Veterinary Diet",
        icon: icons.vetDiet,
        iconColor: "rgba(74, 175, 87, 1)",
        backgroundColor: "rgba(74, 175, 87,.12)",
        onPress: null
    },
    {
        id: "7",
        name: "Toys",
        icon: icons.toys,
        iconColor: "rgba(0, 188, 211, 1)",
        backgroundColor: "rgba(0, 188, 211,.12)",
        onPress: null
    },
    {
        id: "8",
        name: "Accessories",
        icon: icons.accessories,
        iconColor: "rgba(114, 16, 255, 1)",
        backgroundColor: "rgba(114, 16, 255, .12)",
        onPress: null
    },
    {
        id: "9",
        name: "Grooming",
        icon: icons.grooming,
        iconColor: "rgba(114, 16, 255, 1)",
        backgroundColor: "rgba(114, 16, 255, .12)",
        onPress: null
    },
    {
        id: "10",
        name: "Dental Care",
        icon: icons.dentalCare,
        iconColor: "rgba(114, 16, 255, 1)",
        backgroundColor: "rgba(114, 16, 255, .12)",
        onPress: null
    },
    {
        id: "11",
        name: "Cat Food",
        icon: icons.catFood,
        iconColor: "rgba(114, 16, 255, 1)",
        backgroundColor: "rgba(114, 16, 255, .12)",
        onPress: null
    },
    {
        id: "12",
        name: "Dog Food",
        icon: icons.dogFood,
        iconColor: "rgba(114, 16, 255, 1)",
        backgroundColor: "rgba(114, 16, 255, .12)",
        onPress: null
    },
    {
        id: "13",
        name: "Bird Food",
        icon: icons.birdFood,
        iconColor: "rgba(114, 16, 255, 1)",
        backgroundColor: "rgba(114, 16, 255, .12)",
        onPress: null
    },
    {
        id: "14",
        name: "Fish Food",
        icon: icons.fishFood,
        iconColor: "rgba(114, 16, 255, 1)",
        backgroundColor: "rgba(114, 16, 255, .12)",
        onPress: null
    },
    {
        id: "15",
        name: "Small Animal Food",
        icon: icons.smallAnimal,
        iconColor: "rgba(114, 16, 255, 1)",
        backgroundColor: "rgba(114, 16, 255, .12)",
        onPress: null
    }
];


export const products = [
    {
        id: "1",
        name: "Premium Chicken Dry Food",
        image: images.dryFood1,
        distance: "500 m",
        price: "$20.00",
        fee: "$2.50",
        rating: 4.9,
        numReviews: "1.8k",
        categoryId: "1",
    },
    {
        id: "2",
        name: "Salmon & Tuna Wet Food",
        image: images.wetFood1,
        distance: "1 km",
        price: "$15.00",
        fee: "$2.00",
        rating: 4.8,
        numReviews: "1.5k",
        categoryId: "2",
    },
    {
        id: "3",
        name: "Crunchy Chicken Treats",
        image: images.treats1,
        distance: "750 m",
        price: "$7.00",
        fee: "$1.00",
        rating: 4.7,
        numReviews: "1.2k",
        categoryId: "3",
    },
    {
        id: "4",
        name: "Joint Health Supplements",
        image: images.supplements1,
        distance: "2 km",
        price: "$25.00",
        fee: "$3.00",
        rating: 4.9,
        numReviews: "900",
        categoryId: "4",
    },
    {
        id: "5",
        name: "Organic Grain-Free Food",
        image: images.organic1,
        distance: "1.5 km",
        price: "$22.00",
        fee: "$2.50",
        rating: 4.8,
        numReviews: "1.3k",
        categoryId: "5",
    },
    {
        id: "6",
        name: "Veterinary Diet Urinary Care",
        image: images.vetDiet1,
        distance: "3 km",
        price: "$30.00",
        fee: "$3.50",
        rating: 4.7,
        numReviews: "800",
        categoryId: "6",
    },
    {
        id: "7",
        name: "Interactive Chew Toy",
        image: images.toy1,
        distance: "1.2 km",
        price: "$10.00",
        fee: "$1.00",
        rating: 4.9,
        numReviews: "1.6k",
        categoryId: "7",
    },
    {
        id: "8",
        name: "Luxury Pet Collar",
        image: images.accessory1,
        distance: "2.5 km",
        price: "$18.00",
        fee: "$2.00",
        rating: 4.8,
        numReviews: "950",
        categoryId: "8",
    },
    {
        id: "9",
        name: "Gentle Grooming Brush",
        image: images.grooming1,
        distance: "800 m",
        price: "$12.00",
        fee: "$1.50",
        rating: 4.8,
        numReviews: "1.1k",
        categoryId: "9",
    }
];


export const myFavouriteProducts = [
    {
        id: "1",
        name: "Premium Chicken Dry Food",
        image: images.dryFood1,
        distance: "100 m",
        price: "$10.00",
        fee: "$2.00",
        rating: 4.8,
        numReviews: "1.2k",
        categoryId: "1",
    },
    {
        id: "2",
        name: "Salmon & Tuna Wet Food",
        image: images.wetFood1,
        distance: "1.2 km",
        price: "$8.00",
        fee: "$1.00",
        rating: 4.9,
        numReviews: "1k",
        categoryId: "2",
    },
    {
        id: "3",
        name: "Crunchy Chicken Treats",
        image: images.treats1,
        distance: "1.6 km",
        price: "$6.00",
        fee: "$1.50",
        rating: 4.5,
        numReviews: "800",
        categoryId: "3",
    },
    {
        id: "4",
        name: "Joint Health Supplements",
        image: images.supplements1,
        distance: "2.5 km",
        price: "$9.00",
        fee: "$2.00",
        rating: 4.7,
        numReviews: "900",
        categoryId: "4",
    },
    {
        id: "5",
        name: "Organic Grain-Free Food",
        image: images.organic1,
        distance: "800 m",
        price: "$12.00",
        fee: "$2.50",
        rating: 4.6,
        numReviews: "1.1k",
        categoryId: "5",
    },
    {
        id: "6",
        name: "Veterinary Diet Urinary Care",
        image: images.vetDiet1,
        distance: "3.0 km",
        price: "$15.00",
        fee: "$3.00",
        rating: 4.8,
        numReviews: "1.5k",
        categoryId: "1",
    },
    {
        id: "7",
        name: "Interactive Chew Toy",
        image: images.toy1,
        distance: "2.0 km",
        price: "$10.00",
        fee: "$1.50",
        rating: 4.7,
        numReviews: "950",
        categoryId: "2",
    },
    {
        id: "8",
        name: "Luxury Pet Collar",
        image: images.accessory1,
        distance: "1.8 km",
        price: "$5.00",
        fee: "$1.00",
        rating: 4.9,
        numReviews: "1.4k",
        categoryId: "3",
    },
    {
        id: "9",
        name: "Gentle Grooming Brush",
        image: images.grooming1,
        distance: "1.4 km",
        price: "$18.00",
        fee: "$3.00",
        rating: 4.8,
        numReviews: "1.2k",
        categoryId: "4",
    },
];

export const drink = [
    {
        id: "1",
        name: "Fresh Avocado Juice",
        image: images.drink1,
        price: "$4.00",
        categoryId: "5",
        isPromo: true
    },
    {
        id: "2",
        name: "Fresh Orange Juice",
        image: images.drink2,
        price: "$6.00",
        categoryId: "3",
        isPromo: false
    },
    {
        id: "7",
        name: "Fresh Mango Juice",
        image: images.drink3,
        price: "$8.00",
        categoryId: "2",
        isNew: false
    },
]

export const discountProducts = [
    {
        id: "1",
        name: "Premium Chicken Dry Food",
        image: images.dryFood1,
        distance: "100 m",
        price: "$10.00",
        fee: "$2.00",
        rating: 4.8,
        numReviews: "1.2k",
        categoryId: "1",
    },
    {
        id: "2",
        name: "Salmon & Tuna Wet Food",
        image: images.wetFood1,
        distance: "1.2 km",
        price: "$8.00",
        fee: "$1.00",
        rating: 4.9,
        numReviews: "1k",
        categoryId: "2",
    },
    {
        id: "3",
        name: "Crunchy Chicken Treats",
        image: images.treats1,
        distance: "1.6 km",
        price: "$6.00",
        fee: "$1.50",
        rating: 4.5,
        numReviews: "800",
        categoryId: "3",
    },
    {
        id: "4",
        name: "Joint Health Supplements",
        image: images.supplements1,
        distance: "2.5 km",
        price: "$9.00",
        fee: "$2.00",
        rating: 4.7,
        numReviews: "900",
        categoryId: "4",
    },
    {
        id: "5",
        name: "Organic Grain-Free Food",
        image: images.organic1,
        distance: "800 m",
        price: "$12.00",
        fee: "$2.50",
        rating: 4.6,
        numReviews: "1.1k",
        categoryId: "5",
    },
    {
        id: "6",
        name: "Veterinary Diet Urinary Care",
        image: images.vetDiet1,
        distance: "3.0 km",
        price: "$15.00",
        fee: "$3.00",
        rating: 4.8,
        numReviews: "1.5k",
        categoryId: "1",
    },
    {
        id: "7",
        name: "Interactive Chew Toy",
        image: images.toy1,
        distance: "2.0 km",
        price: "$10.00",
        fee: "$1.50",
        rating: 4.7,
        numReviews: "950",
        categoryId: "2",
    },
    {
        id: "8",
        name: "Luxury Pet Collar",
        image: images.accessory1,
        distance: "1.8 km",
        price: "$5.00",
        fee: "$1.00",
        rating: 4.9,
        numReviews: "1.4k",
        categoryId: "3",
    },
    {
        id: "9",
        name: "Gentle Grooming Brush",
        image: images.grooming1,
        distance: "1.4 km",
        price: "$18.00",
        fee: "$3.00",
        rating: 4.8,
        numReviews: "1.2k",
        categoryId: "4",
    },
];

export const recommendedProducts = [
    {
        id: "1",
        name: "Premium Chicken Dry Food",
        image: images.dryFood1,
        distance: "100 m",
        price: "$10.00",
        fee: "$2.00",
        rating: 4.8,
        numReviews: "1.2k",
        categoryId: "1",
        isPromo: true
    },
    {
        id: "2",
        name: "Salmon & Tuna Wet Food",
        image: images.wetFood1,
        distance: "1.2 km",
        price: "$8.00",
        fee: "$1.00",
        rating: 4.9,
        numReviews: "1k",
        categoryId: "2",
        isPromo: false
    },
    {
        id: "3",
        name: "Crunchy Chicken Treats",
        image: images.treats1,
        distance: "1.6 km",
        price: "$6.00",
        fee: "$1.50",
        rating: 4.5,
        numReviews: "800",
        categoryId: "3",
        isPromo: true
    },
    {
        id: "4",
        name: "Joint Health Supplements",
        image: images.supplements1,
        distance: "2.5 km",
        price: "$9.00",
        fee: "$2.00",
        rating: 4.7,
        numReviews: "900",
        categoryId: "4",
        isPromo: true
    },
    {
        id: "5",
        name: "Organic Grain-Free Food",
        image: images.organic1,
        distance: "800 m",
        price: "$12.00",
        fee: "$2.50",
        rating: 4.6,
        numReviews: "1.1k",
        categoryId: "5",
        isPromo: true
    },
    {
        id: "6",
        name: "Veterinary Diet Urinary Care",
        image: images.vetDiet1,
        distance: "3.0 km",
        price: "$15.00",
        fee: "$3.00",
        rating: 4.8,
        numReviews: "1.5k",
        categoryId: "1",
        isPromo: true
    },
    {
        id: "7",
        name: "Interactive Chew Toy",
        image: images.toy1,
        distance: "2.0 km",
        price: "$10.00",
        fee: "$1.50",
        rating: 4.7,
        numReviews: "950",
        categoryId: "2",
        isPromo: false
    },
    {
        id: "8",
        name: "Luxury Pet Collar",
        image: images.accessory1,
        distance: "1.8 km",
        price: "$5.00",
        fee: "$1.00",
        rating: 4.9,
        numReviews: "1.4k",
        categoryId: "3",
        isPromo: true
    },
    {
        id: "9",
        name: "Gentle Grooming Brush",
        image: images.grooming1,
        distance: "1.4 km",
        price: "$18.00",
        fee: "$3.00",
        rating: 4.8,
        numReviews: "1.2k",
        categoryId: "4",
        isPromo:true
    },
];

export const ratings = [
    {
        id: "1",
        title: "All"
    },
    {
        id: "6",
        title: "5"
    },
    {
        id: "5",
        title: "4"
    },
    {
        id: "4",
        title: "3"
    },
    {
        id: "3",
        title: "2"
    },
    {
        id: "2",
        title: "1"
    }
];

export const cuisines = [
    {
        id: "1",
        name: "All"
    },
    {
        id: "2",
        name: "Dessert"
    },
    {
        id: "3",
        name: "Beverages"
    },
    {
        id: "4",
        name: "Snack"
    },
    {
        id: "5",
        name: "Chicken"
    },
    {
        id: "6",
        name: "Bakery and cake"
    },
    {
        id: "7",
        name: "Breakfast"
    },
    {
        id: "8",
        name: "Chinese"
    },
    {
        id: "9",
        name: "Japanese"
    },
    {
        id: "10",
        name: "Fast Food"
    },
    {
        id: "11",
        name: "Noodles"
    },
    {
        id: "12",
        name: "Seafood"
    },
    {
        id: "13",
        name: "Pizza & Pasta"
    },
    {
        id: "14",
        name: "Hamburger"
    },
    {
        id: "15",
        name: "Lunch"
    },
];

export const productReviews = [
    {
        id: "1",
        avatar: images.user1,
        name: "Jessica Lee",
        description: "My cat absolutely loves the Premium Chicken Dry Food! Her coat looks shinier, and she's more energetic. Highly recommend for cat owners! 🐱",
        rating: 4.9,
        avgRating: 5,
        date: "2024-03-28T12:00:00.000Z",
        numLikes: 280
    },
    {
        id: "2",
        avatar: images.user2,
        name: "Mark Thompson",
        description: "The Salmon & Tuna Wet Food is fantastic! My dog devours it every meal, and I've noticed an improvement in his digestion. Definitely buying again!",
        rating: 4.8,
        avgRating: 5,
        date: "2024-03-28T12:00:00.000Z",
        numLikes: 120
    },
    {
        id: "3",
        avatar: images.user3,
        name: "Linda Martinez",
        description: "These Crunchy Chicken Treats are a big hit with my dog. They're healthy and clearly delicious—great for training too!",
        rating: 4.7,
        avgRating: 5,
        date: "2024-03-29T12:00:00.000Z",
        numLikes: 195
    },
    {
        id: "4",
        avatar: images.user4,
        name: "Sam Richards",
        description: "I started using the Joint Health Supplements for my older dog, and the results have been impressive. He's more active and happier now!",
        rating: 4.9,
        avgRating: 5,
        date: "2024-03-29T12:00:00.000Z",
        numLikes: 160
    },
    {
        id: "5",
        avatar: images.user5,
        name: "Chris Johnson",
        description: "Organic Grain-Free Food was a great choice for my dog with allergies. He's healthier and seems to love the taste!",
        rating: 4.5,
        avgRating: 5,
        date: "2024-02-28T12:00:00.000Z",
        numLikes: 240
    },
    {
        id: "6",
        avatar: images.user6,
        name: "Sophia Miller",
        description: "The Interactive Chew Toy is amazing. My dog spends hours playing with it, and it's super durable. Highly recommended!",
        rating: 4.8,
        avgRating: 5,
        date: "2024-02-29T12:00:00.000Z",
        numLikes: 310
    },
];

export const myCart = [
    {
        id: "1",
        name: "Premium Chicken Dry Food", 
        image1: images.dryFood2, 
        image2: images.dryFood2, 
        image3: images.dryFood2, 
        numItems: 2, 
        distance: "500 m",
        price: "$20.00", 
    },
    {
        id: "2",
        name: "Salmon & Tuna Wet Food",
        image1: images.wetFood1,
        image2: images.wetFood1,
        image3: images.wetFood1,
        price: "$15.00", 
        numItems: 3, 
        distance: "1 km", 
    },
    {
        id: "3",
        name: "Crunchy Chicken Treats",
        image1: images.treats1,
        image2: images.treats1,
        image3: images.treats1,
        price: "$7.00", 
        numItems: 4, 
        distance: "750 m",
    },
    {
        id: "4",
        name: "Joint Health Supplements",
        image1: images.supplements1,
        image2: images.supplements1,
        image3: images.supplements1,
        price: "$25.00", 
        numItems: 1, 
        distance: "2 km",
    },
    {
        id: "5",
        name: "Organic Grain-Free Food",
        image1: images.organic1,
        image2: images.organic1,
        image3: images.organic1,
        price: "$22.00", 
        numItems: 2, 
        distance: "1.5 km",
    },
    {
        id: "6",
        name: "Interactive Chew Toy",
        image1: images.toy1,
        image2: images.toy1,
        image3: images.toy1,
        price: "$10.00", 
        numItems: 1, 
        distance: "1.2 km",
    },
    {
        id: "7",
        name: "Luxury Pet Collar",
        image1: images.accessory1,
        image2: images.accessory1,
        image3: images.accessory1,
        price: "$18.00", 
        numItems: 1, 
        distance: "2.5 km",
    },
];

export const activeOrders = [
    {
      id: 1,
      status: "Scheduled",
      date: "15 Feb, 10:00 AM",
      name: "Premium Chicken Dry Food",
      image: images.dryFood1,
      totalPrice: 29.99,
      address: "123 Main St, Cityville",
      hasRemindMe: true,
      rating: 4.9,
    },
    {
      id: 2,
      status: "Scheduled",
      date: "16 Feb, 2:00 PM",
      name: "Salmon & Tuna Wet Food",
      image: images.wetFood1,
      totalPrice: 19.99,
      address: "456 Oak St, Townsville",
      hasRemindMe: true,
      rating: 4.7
    },
    {
      id: 3,
      status: "Scheduled",
      date: "17 Feb, 9:00 AM",
      name: "Crunchy Chicken Treats",
      image: images.treats1,
      totalPrice: 24.99,
      address: "789 Pine St, Villagetown",
      hasRemindMe: true,
      rating: 4.8
    },
    {
      id: 4,
      status: "Scheduled",
      date: "18 Feb, 3:00 PM",
      name: "Joint Health Supplements",
      image: images.supplements1,
      totalPrice: 39.99,
      address: "910 Elm St, Hamlet",
      hasRemindMe: true,
      rating: 4.7
    },
    {
      id: 5,
      status: "Scheduled",
      date: "19 Feb, 11:00 AM",
      name: "Veterinary Diet Urinary Care",
      image: images.vetDiet1,
      totalPrice: 49.99,
      address: "321 Maple St, Suburbia",
      hasRemindMe: true,
      rating: 4.9
    },
    {
      id: 6,
      status: "Scheduled",
      date: "20 Feb, 1:00 PM",
      name: "Interactive Chew Toy",
      image: images.toy1,
      totalPrice: 34.99,
      address: "567 Cedar St, Countryside",
      hasRemindMe: true,
      rating: 4.9
    },
    {
      id: 7,
      status: "Scheduled",
      date: "21 Feb, 10:30 AM",
      name: "Joint Health Supplements",
      image: images.supplements1,
      totalPrice: 29.99,
      address: "890 Oakwood Dr, Riverside",
      hasRemindMe: true,
      rating: 4.9
    },
    {
      id: 8,
      status: "Scheduled",
      date: "22 Feb, 4:00 PM",
      name: "Gentle Grooming Brush",
      image: images.grooming1,
      totalPrice: 44.99,
      address: "123 Pinecone Ln, Lakeside",
      hasRemindMe: true,
      rating: 4.9
    },
    {
      id: 9,
      status: "Scheduled",
      date: "23 Feb, 12:00 PM",
      name: "Organic Grain-Free Food",
      image: images.organic1,
      totalPrice: 59.99,
      address: "456 Redwood Rd, Mountainview",
      hasRemindMe: true,
      rating: 4.6
    },
  ];
  
  export const completedOrders = [
    {
      id: 1,
      status: "Completed",
      date: "12 Feb, 11:30 AM",
      name: "Premium Chicken Dry Food",
      image: images.dryFood1,
      totalPrice: 129.99,
      address: "789 Pine St, Villagetown",
      hasRemindMe: false,
      rating: 4.9,
    },
    {
      id: 2,
      status: "Completed",
      date: "14 Feb, 3:00 PM",
      name: "Salmon & Tuna Wet Food",
      image: images.wetFood1,
      totalPrice: 199.99,
      address: "910 Elm St, Hamlet",
      hasRemindMe: false,
      rating: 4.6,
    },
    {
      id: 3,
      status: "Completed",
      date: "16 Feb, 1:30 PM",
      name: "Crunchy Chicken Treats",
      image: images.treats1,
      totalPrice: 349.99,
      address: "321 Maple St, Suburbia",
      hasRemindMe: false,
      rating: 4.7,
    },
    {
      id: 4,
      status: "Completed",
      date: "17 Feb, 12:00 PM",
      name: "Joint Health Supplements",
      image: images.supplements1,
      totalPrice: 499.99,
      address: "567 Cedar St, Countryside",
      hasRemindMe: false,
      rating: 4.9,
    },
    {
      id: 5,
      status: "Completed",
      date: "18 Feb, 2:30 PM",
      name: "Veterinary Diet Urinary Care",
      image: images.vetDiet1,
      totalPrice: 79.99,
      address: "890 Oakwood Dr, Riverside",
      hasRemindMe: false,
      rating: 4.6,
    },
    {
      id: 6,
      status: "Completed",
      date: "19 Feb, 11:30 AM",
      name: "Joint Health Supplements",
      image: images.supplements1,
      totalPrice: 129.99,
      address: "123 Pinecone Ln, Lakeside",
      hasRemindMe: false,
      rating: 4.9,
    },
    {
      id: 7,
      status: "Completed",
      date: "20 Feb, 10:00 AM",
      name: "Joint Health Supplements",
      image: images.supplements1,
      totalPrice: 39.99,
      address: "456 Redwood Rd, Mountainview",
      hasRemindMe: false,
      rating: 4.9,
    },
    {
      id: 8,
      status: "Completed",
      date: "21 Feb, 3:30 PM",
      name: "Gentle Grooming Brush",
      image: images.grooming1,
      totalPrice: 299.99,
      address: "789 Elmwood Ave, Lakeshore",
      hasRemindMe: false,
      rating: 4.7,
    },
    {
      id: 9,
      status: "Completed",
      date: "22 Feb, 2:00 PM",
      name: "Organic Grain-Free Food",
      image: images.organic1,
      totalPrice: 159.99,
      address: "910 Birch St, Brookside",
      hasRemindMe: false,
      rating: 4.8
    },
  ];
  
  export const cancelledOrders = [
    {
      id: 1,
      status: "Cancelled",
      date: "12 Feb, 11:30 AM",
      name: "Premium Chicken Dry Food",
      image: images.dryFood1,
      totalPrice: 129.99,
      address: "789 Pine St, Villagetown",
      hasRemindMe: false,
      rating: null,
    },
    {
      id: 2,
      status: "Cancelled",
      date: "14 Feb, 3:00 PM",
      name: "Salmon & Tuna Wet Food",
      image: images.wetFood1,
      totalPrice: 199.99,
      address: "910 Elm St, Hamlet",
      hasRemindMe: false,
      rating: null,
    },
    {
      id: 3,
      status: "Cancelled",
      date: "16 Feb, 1:30 PM",
      name: "Crunchy Chicken Treats",
      image: images.treats1,
      totalPrice: 349.99,
      address: "321 Maple St, Suburbia",
      hasRemindMe: false,
      rating: null,
    },
    {
      id: 4,
      status: "Cancelled",
      date: "17 Feb, 12:00 PM",
      name: "Joint Health Supplements",
      image: images.supplements1,
      totalPrice: 499.99,
      address: "567 Cedar St, Countryside",
      hasRemindMe: false,
      rating: null,
    },
    {
      id: 5,
      status: "Cancelled",
      date: "18 Feb, 2:30 PM",
      name: "Veterinary Diet Urinary Care",
      image: images.vetDiet1,
      totalPrice: 79.99,
      address: "890 Oakwood Dr, Riverside",
      hasRemindMe: false,
      rating: null,
    },
    {
      id: 6,
      status: "Cancelled",
      date: "19 Feb, 11:30 AM",
      name: "Joint Health Supplements",
      image: images.supplements1,
      totalPrice: 129.99,
      address: "123 Pinecone Ln, Lakeside",
      hasRemindMe: false,
      rating: null,
    },
    {
      id: 7,
      status: "Cancelled",
      date: "20 Feb, 10:00 AM",
      name: "Joint Health Supplements",
      image: images.supplements1,
      totalPrice: 39.99,
      address: "456 Redwood Rd, Mountainview",
      hasRemindMe: false,
      rating: null,
    },
    {
      id: 8,
      status: "Cancelled",
      date: "21 Feb, 3:30 PM",
      name: "Gentle Grooming Brush",
      image: images.grooming1,
      totalPrice: 299.99,
      address: "789 Elmwood Ave, Lakeshore",
      hasRemindMe: false,
      rating: null,
    },
    {
      id: 9,
      status: "Cancelled",
      date: "22 Feb, 2:00 PM",
      name: "Organic Grain-Free Food",
      image: images.organic1,
      totalPrice: 159.99,
      address: "910 Birch St, Brookside",
      hasRemindMe: false,
      rating: null,
    },
  ];
  