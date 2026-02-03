import { defineStore } from 'pinia'

export const useMeetingsStore = defineStore('Meetings', {
  state: () => ({
    Meetings: [
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

    ],
    selectedMeeting: null
  }),

  actions: {
    selectMeeting(Meeting) {
      this.selectedMeeting = Meeting
    }
  }
})
