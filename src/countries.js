function range(start, stop) {
  const result = [ start ];

  for (const i = start + 1; i < stop; i++) {
    result.push(i);
  }

  return result;
};

const countries = [
  {
    title: "France",
    fillColor: "#10b981",
    center: [ 2.2514073996097, 46.69715617421 ],
    style: {
      background: "linear-gradient(to right, blue 33%, white 33% 67%, red 67%)"
    },
    cities: [
      {
        title: "Paris",
        center: [ 2.260645763831, 48.92403041017 ],
        locations: [

        ]
      },
      {
        title: "Strasbourg",
        center: [ 7.5449900672441, 48.59516595010 ],
        locations: [
          
        ]
      }
    ]
  },
  {
    title: "Belgium",
    fillColor: "#f43f5e",
    center: [ 4.653382003594, 50.506786826528 ],
    style: {
      background: "linear-gradient(to right, black 33%, yellow 33% 67%, red 67%)"
    },
    cities: [
      {
        title: "Bruges",
        description: "Brugges",
        center: [ 3.258389006055, 51.26443229740 ],
        locations: [
          {
            title: "Basilica of the Holy Blood",
            description: "Basiliek van het Heilig Bloed",
            center: [ 3.2265456520389, 51.208151141217 ],
            cover: 3,
            images: [ 4, 5, 6 ]
          },
          {
            title: "Bruges City Hall",
            description: "Stadhuis Brugge",
            center: [ 3.227106233740, 51.2083301018 ],
            cover: 1,
            images: [ 2 ]
          }
        ]
      }
    ]
  }
];

export default countries;