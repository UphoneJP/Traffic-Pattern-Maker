import { AirportType } from "../types/types";

// 空港データ
const airports: AirportType[] = [
    {
        icao: 'RJCC',
        name: '新千歳空港',
        runways: [
            { id: '01L', touchdownLat: 42.76512005804991, touchdownLng: 141.69221686118084, elevation: 62, distanceFromThreshold: 1312, heading: 2 },
            { id: '01R', touchdownLat: 42.76552438151656, touchdownLng: 141.6958288783073, elevation: 57, distanceFromThreshold: 1312, heading: 2 },
            { id: '19L', touchdownLat: 42.78508620942532, touchdownLng: 141.69240688254905, elevation: 77, distanceFromThreshold: 1312, heading: 182 },
            { id: '19R', touchdownLat: 42.78476893610351, touchdownLng: 141.68878631549995, elevation: 82, distanceFromThreshold: 1312, heading: 182 },
        ],
        varidation: -10
    },
    {
        icao: 'RJCB',
        name: '帯広空港',
        runways: [
            { id: '17', touchdownLat: 42.74062624631823, touchdownLng: 143.21377605229796, elevation: 470, distanceFromThreshold: 1312, heading: 169 },
            { id: '35', touchdownLat: 42.7263978076803, touchdownLng: 143.22108591814487, elevation: 505, distanceFromThreshold: 1312, heading: 139 }
        ],
        varidation: -9
    },
    {
        icao: 'RJSS',
        name: '仙台空港',
        runways: [
            { id: '09', touchdownLat: 38.139170664525906, touchdownLng: 140.9033586619305, elevation: 11, distanceFromThreshold: 1312, heading: 91 },
            { id: '12', touchdownLat: 38.138137645497906, touchdownLng: 140.9178499210166, elevation: 7, distanceFromThreshold: 1000, heading: 126 },
            { id: '27', touchdownLat: 38.14168943197439, touchdownLng: 140.92820786339988, elevation: 15, distanceFromThreshold: 1312, heading: 271 },
            { id: '30', touchdownLat: 38.135634866483734, touchdownLng: 140.92390416678344, elevation: 5, distanceFromThreshold: 1000, heading: 306 },
        ],
        varidation: -9
    },
    {
        icao: 'RJTT',
        name: '東京国際空港',
        runways: [
            { id: '04', touchdownLat: 35.55191624601168, touchdownLng: 139.76384546139312, elevation: 19, distanceFromThreshold: 1312, heading: 43 },
            { id: '05', touchdownLat: 35.5266135892166, touchdownLng: 139.8064768793322, elevation: 46, distanceFromThreshold: 1312, heading: 51 },
            { id: '16L', touchdownLat: 35.55968980255302, touchdownLng: 139.79094761351058, elevation: 19, distanceFromThreshold: 1312, heading: 158 },
            { id: '16R', touchdownLat: 35.55310140652056, touchdownLng: 139.77394040051735, elevation: 16, distanceFromThreshold: 1312, heading: 158 },
            { id: '22', touchdownLat: 35.56446620946174, touchdownLng: 139.7746033761714, elevation: 35, distanceFromThreshold: 1312, heading: 223 },
            { id: '23', touchdownLat: 35.53786089205649, touchdownLng: 139.81919962310351, elevation: 55, distanceFromThreshold: 1312, heading: 231 },
            { id: '34L', touchdownLat: 35.539646992546466, touchdownLng: 139.78347679117033, elevation: 18, distanceFromThreshold: 1312, heading: 338 },
            { id: '34R', touchdownLat: 35.5455895432398, touchdownLng: 139.80091608912466, elevation: 20, distanceFromThreshold: 1312, heading: 338 },
        ],
        varidation: -8
    },
    {
        icao: 'RJAA',
        name: '成田国際空港',
        runways: [
            { id: '16L', touchdownLat: 35.80200919967664, touchdownLng: 140.38036774181504, elevation: 135, distanceFromThreshold: 1312, heading: 158 },
            { id: '16R', touchdownLat: 35.77118128239313, touchdownLng: 140.37060383533452, elevation: 130, distanceFromThreshold: 1312, heading: 158 },
            { id: '34L', touchdownLat: 35.74637676052819, touchdownLng: 140.38851868189937, elevation: 139, distanceFromThreshold: 1312, heading: 338 },
            { id: '34R', touchdownLat: 35.788825461329225, touchdownLng: 140.38993513021114, elevation: 141, distanceFromThreshold: 1312, heading: 338 },
        ],
        varidation: -8
    },
    {
        icao: 'RJGG',
        name: '中部国際空港',
        runways: [
            { id: '18', touchdownLat: 34.870246834894864, touchdownLng: 136.80258875751673, elevation: 15, distanceFromThreshold: 1312, heading: 176 },
            { id: '36', touchdownLat: 34.84638040468091, touchdownLng: 136.80831867974092, elevation: 15, distanceFromThreshold: 1312, heading: 356 },
        ],
        varidation: -7
    },
    {
        icao: 'RJOO',
        name: '大阪国際空港',
        runways: [
            { id: '14L', touchdownLat: 334.79319226382337, touchdownLng: 135.43106020960028, elevation: 50, distanceFromThreshold: 1000, heading: 143 },
            { id: '14R', touchdownLat: 34.7886458454708, touchdownLng: 135.43188990129508, elevation: 46, distanceFromThreshold: 1000, heading: 143 },
            { id: '32L', touchdownLat: 34.77461354979129, touchdownLng: 135.44880458480682, elevation: 31, distanceFromThreshold: 1312, heading: 323 },
            { id: '32R', touchdownLat: 34.78541503446038, touchdownLng: 135.4405015239184, elevation: 34, distanceFromThreshold: 1312, heading: 323 },
        ],
        varidation: -8
    },
    {
      icao: 'RJBB',
      name: '関西国際空港',
      runways: [
          { id: '06L', touchdownLat: 34.43074099017387, touchdownLng: 135.20963686345237, elevation: 9, distanceFromThreshold: 1312, heading: 59 },
          { id: '06R', touchdownLat: 34.41951904710473, touchdownLng: 135.2327088245511, elevation: 5, distanceFromThreshold: 1312, heading: 59 },
          { id: '24L', touchdownLat: 34.43480491634756, touchdownLng: 135.25551082247193, elevation: 12, distanceFromThreshold: 1312, heading: 239 },
          { id: '24R', touchdownLat: 34.4488821335776, touchdownLng: 135.23673772070802, elevation: 16, distanceFromThreshold: 1312, heading: 239 },
      ],
      varidation: -8
    },
    {
        icao: 'RJOA',
        name: '広島空港',
        runways: [
            { id: '10', touchdownLat: 34.43597139534538, touchdownLng: 132.9314561131816, elevation: 1072, distanceFromThreshold: 1312, heading: 98 },
            { id: '28', touchdownLat: 34.435923858382935, touchdownLng: 132.90748321822204, elevation: 1067, distanceFromThreshold: 1312, heading: 278 },
        ],
        varidation: -8
    },
    {
        icao: 'RJFF',
        name: '福岡空港',
        runways: [
            { id: '16L', touchdownLat: 33.593725411230345, touchdownLng: 130.44534227414167, elevation: 15, distanceFromThreshold: 1312, heading: 158 },
            { id: '16R', touchdownLat: 33.592903215505864, touchdownLng: 130.44332526575536, elevation: 15, distanceFromThreshold: 1312, heading: 158 },
            { id: '34L', touchdownLat: 33.582111770773174, touchdownLng: 130.45071514556048, elevation: 32, distanceFromThreshold: 1312, heading: 338 },
            { id: '34R', touchdownLat: 33.57801204156863, touchdownLng: 130.45607368360436, elevation: 32, distanceFromThreshold: 1312, heading: 338 },
        ],
        varidation: -8
    },
    {
        icao: 'RJFM',
        name: '宮崎空港',
        runways: [
            { id: '09', touchdownLat: 31.876408635223328, touchdownLng: 131.43956890224823, elevation: 14, distanceFromThreshold: 1312, heading: 91 },
            { id: '27', touchdownLat: 31.877715658300115, touchdownLng: 131.45739401926866, elevation: 20, distanceFromThreshold: 1312, heading: 271 }
        ],
        varidation: -7
    },
    {
        icao: 'ROAH',
        name: '那覇空港',
        runways: [
            { id: '18L', touchdownLat: 26.20562859694789, touchdownLng: 127.64547423207628, elevation: 11, distanceFromThreshold: 1312, heading: 182 },
            { id: '18R', touchdownLat: 26.199316852210483, touchdownLng: 127.6326105780026, elevation: 16, distanceFromThreshold: 1312, heading: 182 },
            { id: '36L', touchdownLat: 26.18228454709624, touchdownLng: 127.63343192087348, elevation: 14, distanceFromThreshold: 1312, heading: 2 },
            { id: '36R', touchdownLat: 26.18583973421014, touchdownLng: 127.646384934113743, elevation: 9, distanceFromThreshold: 1312, heading: 2 },
        ],
        varidation: -5
    },

];

export default airports
