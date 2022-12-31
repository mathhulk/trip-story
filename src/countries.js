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
            images: [ 4, 5, 6, 7 ]
          },
          {
            title: "Bruges City Hall",
            description: "Stadhuis Brugge",
            center: [ 3.227106233740, 51.2083301018 ],
            cover: 1,
            images: [ 2 ]
          },
          {
            title: "Belfry of Bruges",
            description: "Belfort",
            center: [ 3.2248100738241, 51.2081668535 ],
            cover: 8,
            images: [ 9, 10, 11 ]
          },
          {
            title: "Market Square",
            description: "Grote Markt",
            center: [ 3.2244145507660, 51.208707397282 ],
            cover: 12,
            images: [ 13, 14 ]
          },
          {
            title: "Hotel Bourgoensch Hof",
            description: "Hotel",
            center: [ 3.226543485844574, 51.20741546437233 ],
            cover: 15,
            images: [ 16, 17, 18, 19 ]
          },
          {
            title: "Rosary Quay",
            description: "Rozenhoedkaai",
            center: [ 3.22781545941, 51.20743287709 ],
            cover: 20,
            images: [ 21, 22, 23 ]
          },
          {
            title: "Church of Our Lady Bruges",
            description: "Onze Lieve Vrouw Brugge",
            center: [ 3.224456367048, 51.20471967725 ],
            cover: 24,
            images: [ 25, 26, 27 ]
          },
          {
            title: "Boniface Bridge",
            description: "Bonifaciusbrug",
            center: [ 3.225225598226, 51.20488873551 ],
            cover: 28,
            images: [ 29, 30 ]
          },
          {
            title: "The Four Horsemen of the Apocalypse",
            description: "De Vier Ruiters Van De Apocalyps",
            center: [ 3.225653903764, 51.20524876976 ],
            cover: 31,
            images: [ 32, 33 ]
          }
        ]
      }
    ]
  }
];

export default countries;