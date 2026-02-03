import { defineStore } from 'pinia'

export const useVacationsStore = defineStore('vacations', {
  state: () => ({
    vacations: [
      {
        id: 1,
        name: 'Giraffe Manor',
        description:
          'A boutique hotel in Nairobi where giraffes roam freely. Luxurious rooms and unforgettable wildlife experiences.',
        price: 'Ksh 65,000 / night',
        image: 'public/images/Picture 22 .jpg',
        code: 'GM001',
        website: 'https://www.thesafaricollection.com/properties/giraffe-manor/accommodation-manor-house/'
      },
      {
        id: 2,
        name: 'Maasai Mara Safari Camp',
        description:
          'Experience the ultimate safari in Maasai Mara with luxury tents, private guides, and breathtaking views.',
        price: 'Ksh 40,000 / night',
        image: 'public/images/Picture 8 .jpg',
        code: 'MM001',
        website: 'https://www.booking.com/hotel/ke/maasai-mara-safari-camp-narok.html'
      },
      {
        id: 3,
        name: 'Hemingways Nairobi',
        description:
          'Five-star hotel in Nairobi offering world-class amenities, elegant suites, and panoramic views of the city.',
        price: 'Ksh 55,000 / night',
        image: '/public/images/Picture 31 .jpg',
        code: 'HN001',
        website: 'https://www.hemingways-collection.com/nairobi/'
      },
      {
        id: 4,
        name: 'Sarova Salt Lick Game Lodge',
        description:
          'Luxury lodge in Tsavo National Park surrounded by wildlife. Private rooms with exclusive safari experiences.',
        price: 'Ksh 35,000 / night',
        image: 'public/images/Picture 32 .jpg',
        code: 'SS001',
        website: 'https://saltlicksafarilodge.com/'
      },
      {
        id: 5,
        name: 'The Emakoko',
        description:
          'A serene lodge in Laikipia offering nature retreats, safari tours, and upscale lodging for an unforgettable stay.',
        price: 'Ksh 30,000 / night',
        image: 'public/images/Picture 30 .jpg',
        code: 'EM001',
        website: 'https://www.emakoko.com/'
      },
      {
        id: 6,
        name: 'Villa Rosa Kempinski',
        description:
          'Five-star hotel in Nairobi with luxurious rooms, fine dining, and a world-class spa experience.',
        price: 'Ksh 60,000 / night',
        image: '/public/images/Picture 33 .jpg',
        code: 'VR001',
        website: 'https://www.kempinski.com/en/hotel-villa-rosa'
      },
      {
        id: 7,
        name: 'Fairmont Mount Kenya Safari Club',
        description:
          'Historic luxury resort near Nanyuki offering safari activities, golf, and elegant suites with breathtaking views.',
        price: 'Ksh 50,000 / night',
        image: '/public/images/Picture 34 .jpg',
        code: 'FM001',
        website: 'https://www.fairmont.com/en/hotels/nanyuki/fairmont-mount-kenya-safari-club.html'
      }
    ],
    selectedVacation: null
  }),

  actions: {
    selectVacation(vacation) {
      this.selectedVacation = vacation
    }
  }
})
