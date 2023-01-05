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
          {
            title: "Eiffel Tower",
            description: "Tour Eiffel",
            center: [ 2.294534942569, 48.85850419523 ],
            images: [ 81, 82, 83, 84, 85, 86 ]
          },
          {
            title: "Pont d'Iéna",
            description: "Bridge",
            center: [ 2.2918037248162, 48.85985993166 ],
            cover: 87,
            images: [ 88 ]
          },
          {
            title: "Pont de Bir Hakeim",
            description: "Bridge",
            center: [ 2.2874846155178, 48.85583067105 ],
            cover: 89,
            images: [ 90, 91 ]
          }
        ]
      },
      {
        title: "Strasbourg",
        center: [ 7.5449900672441, 48.59516595010 ],
        locations: [
          {
            title: "Pont Kuss",
            description: "Bridge",
            center: [ 7.739034044303, 48.58331545809 ],
            cover: 34,
            images: [ 35, 36, 37 ]
          },
          {
            title: "The Church of Old Saint Peters",
            description: "Église Saint-Pierre-le-Vieux de Strasbourg",
            center: [ 7.739778346089, 48.58288574441 ],
            cover: 38,
            images: [ 39, 40, 41, 42, 43 ]
          },
          {
            title: "St. Thomas' Church",
            description: "Église Saint-Thomas",
            center: [ 7.745277856767, 48.57978077334 ],
            cover: 44,
            images: [ 45, 46, 47 ]
          },
          {
            title: "Strasbourg Cathedral",
            description: "Cathédrale Notre-Dame de Strasbourg",
            center: [ 7.7510195386973, 48.582000948841 ],
            cover: 48,
            images: [ 49, 50, 51, 52, 53, 54, 55 ]
          },
          {
            title: "Square Louise-Weiss",
            description: "City park",
            center: [ 7.739628829417, 48.580714522288 ],
            cover: 56,
            images: [ 57, 58, 59, 60, 61, 62, 63 ]
          },
          {
            title: "Café Rohan",
            description: "Restaurant",
            center: [ 7.751392041381, 48.580320492950 ],
            cover: 64,
            images: [ 65, 66, 67, 68, 69 ]
          },
          {
            title: "Strasbourg Historical Museum",
            description: "Musée historique de la ville de Strasbourg",
            center: [ 7.750747206787, 48.57978112048 ],
            cover: 70,
            images: [ 71, 72, 73 ]
          },
          {
            title: "Canal du Faux-Rempart",
            description: "Canal",
            center: [ 7.740011856527, 48.583910816221 ],
            cover: 74,
            images: [ 75, 76, 77, 78 ]
          },
          {
            title: "Ponts Couverts",
            description: "Bridges",
            center: [ 7.739333722943, 48.580152554740 ],
            cover: 79,
            images: [ 80 ]
          }
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