import EnriqueGrid from "../image-grids/enrique-grid.component";
import LuisGrid from "../image-grids/luis-grid.component";
import JavierGrid from "../image-grids/javier-grid.component";
import TonyGrid from "../image-grids/tony-grid.component";
import ElvinGrid from "../image-grids/elvin-grid.component";

const BARBERLIST = [
  {
    name: "Enrique",
    nickname: "Enrique The Barbers",
    profilePicture: "enrique-profile-picture.jpg",
    address: "11178 huron st, Suite 200, Northglenn, 80234",
    phone: "7209984505",
    about: "",
    instagramUrl: "https://www.instagram.com/enriquethebarber__/",
    booksyUrl: "https://booksy.com/en-us/dl/show-business/382802",
    ImageGrid: <EnriqueGrid />,
    hours: {
      sunday: [],
      monday: [
        ["10:00", "14:00"],
        ["15:00", "19:00"],
      ],
      tuesday: [["16:00", "20:00"]],
      wednesday: [
        ["10:00", "14:00"],
        ["15:00", "19:00"],
      ],
      thursday: [
        ["08:00", "14:00"],
        ["15:00", "19:00"],
      ],
      friday: [
        ["08:00", "14:00"],
        ["15:00", "19:00"],
      ],
      saturday: [
        ["08:00", "12:00"],
        ["13:00", "17:00"],
      ],
    },
    services: [
      {
        name: "Haircut",
        description: "",
        images: [],
        price: 50,
        duration: 40,
      },
      {
        name: "Haircut & Beard",
        description: "",
        images: [],
        price: 60,
        duration: 60,
      },
      {
        name: "Haircut & Design",
        description: "",
        images: [],
        price: 55,
        duration: 60,
      },
    ],
    reviews: [],
  },
  {
    name: "Luis",
    nickname: "Frezcoo",
    profilePicture: "luis-profile-picture.jpg",
    address: "11178 huron st, Suite 200, Northglenn, 80234",
    phone: "7208092611",
    about:
      "MISSED APPOINTMENTS DUE TO NO CALL/ NO SHOW, WILL BE CHARGED $20. OR $20 WILL BE ADDED TO YOUR SERVICE NEXT VISIT. PLEASE COMMUNICATE 2hrs IN ADVANCED TO NOT BE CHARGED FEE. NO AFTER-PAY/ HAIRCUTS MUST BE PAID IN FULL BEFORE LEAVING! ANY SQUEEZE IN/ AFTER HOURS WILL START AT $75.\nPayments are only accepted with Cash, Venmo or Apple Pay. No-call, No-show will be blocked if no payment. Se habla español.",
    instagramUrl: "https://www.instagram.com/frezcoo/",
    booksyUrl:
      "https://booksy.com/en-us/467029_frezcoo_barber-shop_134761_denver",
    ImageGrid: <LuisGrid />,
    hours: {
      sunday: [],
      monday: [
        ["09:00", "14:00"],
        ["15:00", "19:00"],
      ],
      tuesday: [
        ["11:00", "14:00"],
        ["15:00", "19:00"],
      ],
      wednesday: [
        ["09:00", "14:00"],
        ["15:00", "19:00"],
      ],
      thursday: [
        ["09:00", "14:00"],
        ["15:00", "19:00"],
      ],
      friday: [
        ["09:00", "14:00"],
        ["15:00", "19:00"],
      ],
      saturday: [
        ["09:00", "12:00"],
        ["13:00", "17:00"],
      ],
    },
    services: [
      {
        name: "Haircut",
        description: "",
        images: [],
        price: 50,
        duration: 55,
      },
      {
        name: "Haircut & Beard",
        description: "",
        images: [],
        price: 60,
        duration: 60,
      },
      {
        name: "Haircut & Design",
        description: "",
        images: [],
        price: 55,
        duration: 60,
      },
    ],
    reviews: [],
  },
  {
    name: "Javier",
    nickname: "Javier Guero Barber",
    profilePicture: "javier-profile-picture.jpg",
    address: "11178 huron st, Suite 200, Northglenn, 80234",
    phone: "7203459189",
    about: "",
    instagramUrl: "https://www.instagram.com/artist_fadez/",
    booksyUrl:
      "https://booksy.com/en-us/500075_javier-guero-barber_barber-shop_134761_denver#ba_s=sh_1",
    ImageGrid: <JavierGrid />,
    hours: {
      sunday: [],
      monday: [["10:45", "19:00"]],
      tuesday: [["10:45", "19:00"]],
      wednesday: [["10:45", "19:00"]],
      thursday: [["10:45", "19:00"]],
      friday: [["10:45", "23:00"]],
      saturday: [["08:30", "17:30"]],
    },
    services: [
      {
        name: "Haircut",
        description:
          "For any add ons like desings or eyebrows it's going to be an extra $10",
        images: [],
        price: 40,
        duration: 45,
      },
      {
        name: "Haircut & Beard",
        description:
          "For any add ons like desings or eyebrows it's going to be an extra $10",
        images: [],
        price: 50,
        duration: 50,
      },
    ],
    reviews: [],
  },
  {
    name: "Tony",
    nickname: "Tony Blurrz",
    profilePicture: "tony-profile-picture.jpg",
    address: "11178 huron st, Suite 200, Northglenn, 80234",
    phone: "3034353569",
    about:
      "MISSED APPOINTMENTS DUE TO NO CALL/SHOW, WILL BE CHARGED $20 ON TOP OF YOUR SERVICE NEXT VISIT. PLEASE COMMUNICATE 3hrs IN ADVANCED TO NOT BE CHARGED FEE.\nPayment are only accepted with Cash, Venmo or Apple Pay. No-call, No-show will be blocked. Se habla español.",
    instagramUrl: "https://www.instagram.com/tonyblurrz/",
    booksyUrl:
      "https://booksy.com/en-us/602202_tony-blurrz_barber-shop_134761_denver#ba_s=sh_",
    ImageGrid: <TonyGrid />,
    hours: {
      sunday: [],
      monday: [
        ["10:00", "14:00"],
        ["15:00", "18:00"],
      ],
      tuesday: [
        ["08:00", "14:00"],
        ["16:00", "19:00"],
      ],
      wednesday: [
        ["10:00", "14:00"],
        ["16:00", "18:00"],
      ],
      thursday: [
        ["09:00", "14:00"],
        ["15:00", "18:00"],
      ],
      friday: [
        ["08:00", "14:00"],
        ["15:00", "19:00"],
      ],
      saturday: [["08:00", "17:00"]],
    },
    services: [
      {
        name: "Haircut",
        description:
          "Any type of haircut of your choice (skin fades, regulat, etc)!! Eyebrows optional!",
        images: [],
        price: 50,
        duration: 60,
      },
      {
        name: "Haircut & Design",
        description: "Any Haircute of your choice with design!",
        images: [],
        price: 55,
        duration: 60,
      },
      {
        name: "Kid's Haircute (10 & Under)",
        description: "",
        images: [],
        price: 40,
        duration: 45,
      },
    ],
    reviews: [],
  },
  {
    name: "Elvin",
    nickname: "Astro Blendzz",
    profilePicture: "elvin-profile-picture.jpg",
    address: "11178 huron st, Suite 200, Northglenn, 80234",
    phone: "7202571372",
    about:
      "Looking for a new barber near you?\n\nThis is your chance to book your appointment and elevate on your haircuts! Consistent haircuts, trims and shaves! I prioritize quality over quantity. Im giving you the confidence plus the refreshing feeling walking out of the barbershop. Whether it's a classic haircut or the latest trend haircut! I got you covered!\n\nPromotion\nAny new clients im giving you $10 dollars off any service you would like! I'm always accepting new clients! Anytime you refer 3 new clients to me, I will give you a free haircut!",
    instagramUrl: "https://www.instagram.com/astro_blendzz/",
    booksyUrl:
      "https://booksy.com/en-us/497516_astro-blendzz_barber-shop_134761_denver#ba_s=sr_1",
    ImageGrid: <ElvinGrid />,
    hours: {
      sunday: [],
      monday: [],
      tuesday: [["15:00", "19:00"]],
      wednesday: [["15:00", "19:00"]],
      thursday: [
        ["10:00", "14:00"],
        ["15:00", "19:00"],
      ],
      friday: [
        ["09:00", "14:00"],
        ["15:00", "19:00"],
      ],
      saturday: [
        ["09:00", "13:00"],
        ["14:00", "17:00"],
      ],
    },
    services: [
      {
        name: "Haircut",
        description: "",
        images: [],
        price: 60,
        duration: 60,
      },
      {
        name: "Haircut & Beard",
        description: "",
        images: [],
        price: 60,
        duration: 60,
      },
      {
        name: "Haircut & Design",
        description: "",
        images: [],
        price: 60,
        duration: 60,
      },
      {
        name: "Full Service",
        description: "Hair Wash, Haircut, Design, Beard, Eyebrows",
        images: [],
        price: 70,
        duration: 60,
      },
    ],
    reviews: [],
  },
];

export default BARBERLIST;
