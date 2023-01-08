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
        title: "Versailles",
        center: [ 2.1204217755070, 48.80493919355 ],
        reverse: true,
        locations: [
          {
            title: "Palace of Versailles",
            description: "Château de Versailles",
            center: [ 2.1204217755070, 48.80493919355 ],
            cover: 184,
            images: [ 185, 186, 187, 188, 189, 190, 191, 192 ]
          }
        ]
      },
      {
        title: "Paris",
        center: [ 2.343226492292, 48.8631972414 ],
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
          },
          {
            title: "Iolanda",
            description: "Restaurant",
            center: [ 2.2892262423352, 48.85466313164 ],
            images: [ 92, 93, 94, 95 ]
          },
          {
            title: "Fontaine Saint-Michel",
            description: "Fountain",
            center: [ 2.343822680425, 48.853351985504 ],
            images: [ 96, 97 ]
          },
          {
            title: "Latin Quarter",
            description: "Quartier latin",
            center: [ 2.3452599530620, 48.850942440931 ],
            cover: 98,
            images: [ 99, 100, 101, 102, 103, 104 ]
          },
          {
            title: "Pont Saint-Michel",
            description: "Bridge",
            center: [ 2.344977817005, 48.85445032813 ],
            cover: 105,
            images: [ 106, 107, 166, 167, 168 ]
          },
          {
            title: "Notre-Dame",
            description: "Cathédrale Notre-Dame de Paris",
            center: [ 2.3499163680669, 48.853080209363 ],
            cover: 108,
            images: [ 109, 110, 111 ]
          },
          {
            title: "Saint-Jacques Tower",
            description: "Tour Saint-Jacques",
            center: [ 2.3489163295961, 48.85800713760 ],
            images: [ 112, 113 ]
          },
          {
            center: [ 2.3376097165464, 48.860606437639 ],
            title: "Louvre Museum",
            description: "Musée du Louvre",
            cover: 114,
            images: [ 115, 116, 117, 118, 119, 120, 121, 122, 123, 124 ]
          },
          {
            center: [ 2.2950540981710, 48.8738885537 ],
            title: "Arc de Triomphe",
            description: "Monument",
            cover: 126,
            images: [ 125, 127, 128 ]
          },
          {
            center: [ 2.347157266773, 48.85258479342 ],
            title: "Shakespeare and Company",
            description: "Book store",
            images: [ 129, 130, 131, 132 ]
          },
          {
            center: [ 2.3078169345505, 48.86362632245 ],
            title: "Seine",
            description: "River",
            cover: 133,
            images: [ 134, 135, 136 ]
          },
          {
            center: [ 2.3333418124805, 48.853859148776 ],
            title: "Saint-Germain-des-Prés",
            description: "Quartier Saint-Germain-des-Prés",
            cover: 137,
            images: [ 138, 139, 140, 141 ]
          },
          {
            center: [ 2.3404347331234, 48.88492023070 ],
            title: "Maison Milie",
            description: "Cafe",
            images: [ 142, 143, 144, 145 ]
          },
          {
            center: [ 2.343107924688, 48.886758854028 ],
            title: "Sacré-Cœur",
            description: "Basilica",
            cover: 146,
            images: [ 147, 148, 149, 150, 151, 152 ]
          },
          {
            title: "Place du Tertre",
            description: "Plaza",
            center: [ 2.340803905388, 48.88649760759 ],
            cover: 153,
            images: [ 154, 155, 156, 157, 158 ]
          },
          {
            title: "Musée de l'Orangerie",
            description: "Art museum",
            center: [ 2.3226651145235, 48.863793820441 ],
            cover: 159,
            images: [ 160, 161, 162, 163, 164, 165 ]
          },
          {
            center: [ 2.3449930308639, 48.855474231217 ],
            title: "Sainte-Chapelle",
            description: "Chapel",
            cover: 169,
            images: [ 170, 171, 172, 173, 174, 175 ]
          },
          {
            title: "Musée d'Orsay",
            description: "Art museum",
            center: [ 2.326584700500, 48.859965972493 ],
            images: [ 176, 177, 178, 179, 180, 181, 182, 183 ]
          }
        ]
      },
      {
        title: "Strasbourg",
        center: [ 7.747294634864, 48.58300951615 ],
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
        center: [ 3.22431653797, 51.20893967177 ],
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
            images: [ 13, 14, 200 ]
          },
          {
            title: "Hotel Bourgoensch Hof",
            description: "Hotel",
            center: [ 3.226543485844574, 51.20741546437233 ],
            cover: 15,
            images: [ 16, 17, 18, 19, 193, 194, 195, 201, 210 ]
          },
          {
            title: "Rosary Quay",
            description: "Rozenhoedkaai",
            center: [ 3.22781545941, 51.20743287709 ],
            cover: 20,
            images: [ 21, 22, 23, 202 ]
          },
          {
            title: "Church of Our Lady Bruges",
            description: "Onze Lieve Vrouw Brugge",
            center: [ 3.224456367048, 51.20471967725 ],
            cover: 24,
            images: [ 25, 26, 27, 196, 197, 198, 199 ]
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
            images: [ 32, 33, 206 ]
          },
          {
            title: "Spiegelrei",
            description: "Tourist attraction",
            center: [ 3.227696499315, 51.21206089379 ],
            cover: 203,
            images: [ 204, 205 ]
          },
          {
            title: "Torture Museum Oude Steen",
            description: "History museum",
            center: [ 3.2260993984664, 51.2077145883 ],
            images: [ 207, 208, 209 ]
          }
        ]
      }
    ]
  }
];

export default countries;