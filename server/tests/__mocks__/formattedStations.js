// Mock recently played stations data

const formattedStations = [
  {
    id: 'db93a00f-9191-46ab-9e87-ec9b373b3eee',
    name: '\tArrow Classic Rock',
    url: 'http://stream.gal.io/arrow',
    favicon: 'https://www.arrow.nl/wp-content/uploads/2020/08/logo.png',
    country: 'The Netherlands'
  },
  {
    id: 'd608bb74-0740-47e3-a1e2-c11edfeec91f',
    name: ' \tROCKANTENNE Alternative (mp3)',
    url: 'https://stream.rockantenne.de/alternative/stream/mp3',
    favicon: 'https://www.rockantenne.de/logos/station-rock-antenne/apple-touch-icon.png',
    country: 'Germany'
  },
  {
    id: '336f18d8-6a0d-4422-9e70-785648d6c61f',
    name: ' 101.9 ROCK',
    url: 'https://rogers-hls.leanstream.co/rogers/nor1019.stream/icy?environment=tunein&args=tunein_01',
    favicon: 'api/img/default-radio-icon',
    country: 'Canada'
  },
  {
    id: 'c1cf2a48-9720-4728-bf6d-bae391f5bccd',
    name: '__ROCK__ by rautemusik (rm.fm)',
    url: 'https://rock-high.rautemusik.fm/?ref=radiobrowser',
    favicon: 'https://www.rm.fm/favicon.ico',
    country: 'Germany'
  },
  {
    id: 'fd13051d-40ec-11e9-aa55-52543be04c81',
    name: '- 0 N - Classic Rock on Radio',
    url: 'https://0n-classicrock.radionetz.de/0n-classicrock.aac',
    favicon: 'https://www.0nradio.com/logos/0n-classic-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: 'f3ecef5a-d342-42a1-a59f-c2ba4a5a1394',
    name: '- 0 N - Classic Rock on Radio',
    url: 'https://0n-classicrock.radionetz.de/0n-classicrock.mp3',
    favicon: 'https://www.0nradio.com/logos/0n-classic-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: 'd389d73e-60a1-4246-bc27-7fe172fd91b5',
    name: '- 0 N - Deutsch Rock on Radio',
    url: 'https://0n-deutschrock.radionetz.de/0n-deutschrock.aac',
    favicon: 'https://www.0nradio.com/logos/0n-deutsch-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: '0cf0aa9e-3def-49bd-838a-de40f2e647c4',
    name: '- 0 N - Deutsch Rock on Radio',
    url: 'https://0n-deutschrock.radionetz.de/0n-deutschrock.mp3',
    favicon: 'https://www.0nradio.com/logos/0n-deutsch-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: 'b4ff9d51-f362-11e8-a471-52543be04c81',
    name: '- 0 N - Rock on Radio',
    url: 'https://0n-rock.radionetz.de/0n-rock.aac',
    favicon: 'https://www.0nradio.com/logos/0n-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: '6e4f8762-17f3-4b11-8719-5ad18f5159ad',
    name: '- 0 N - Rock on Radio',
    url: 'https://0n-rock.radionetz.de/0n-rock.mp3',
    favicon: 'https://www.0nradio.com/logos/0n-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: '42f1b1d9-8ea6-4238-9629-09efbd06c330',
    name: '- 0 N - Soft Rock on Radio',
    url: 'https://0n-softrock.radionetz.de/0n-softrock.aac',
    favicon: 'https://www.0nradio.com/logos/0n-soft-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: 'ed4fb1c0-74a9-462c-85a7-5a6bc49f275f',
    name: '- 0 N - Soft Rock on Radio',
    url: 'https://0n-softrock.radionetz.de/0n-softrock.mp3',
    favicon: 'https://www.0nradio.com/logos/0n-soft-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: 'b394b97a-bf9c-11e9-8502-52543be04c81',
    name: '- 1 A - Classic Rock von 1A Radio',
    url: 'https://1a-classicrock.radionetz.de/1a-classicrock.aac',
    favicon: 'https://www.1aradio.com/logos/1a-classic-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: '864f2e75-bf9c-11e9-8502-52543be04c81',
    name: '- 1 A - Classic Rock von 1A Radio',
    url: 'https://1a-classicrock.radionetz.de/1a-classicrock.mp3',
    favicon: 'https://www.1aradio.com/logos/1a-classic-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: 'f7d332d4-f375-11e8-a471-52543be04c81',
    name: '- 1 A - Rock von 1A Radio',
    url: 'https://1a-rock.radionetz.de/1a-rock.aac',
    favicon: 'https://www.1aradio.com/logos/1a-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: 'd5831ac6-f375-11e8-a471-52543be04c81',
    name: '- 1 A - Rock von 1A Radio',
    url: 'https://1a-rock.radionetz.de/1a-rock.mp3',
    favicon: 'https://www.1aradio.com/logos/1a-rock_600x600.jpg',
    country: 'Germany'
  },
  {
    id: '52d478de-1411-43da-8ce4-bb35e30dc508',
    name: '[laut.fm] Prog Rock Station',
    url: 'http://stream.laut.fm/prog-rock-station',
    favicon: 'api/img/default-radio-icon',
    country: 'Germany'
  },
  {
    id: 'ca1b929e-1b92-4240-bb44-22fd8158808e',
    name: '[laut.fm] Progressiv Rock',
    url: 'https://stream.laut.fm/progressiv-rock',
    favicon: 'https://laut.fm/assets/touch-icons/favicon-32x32.png',
    country: 'Germany'
  },
  {
    id: '13d86ff8-058f-44e6-ba21-ccd065fb5dca',
    name: '#joint radio Blues Rock',
    url: 'https://jointil.com/stream-blues',
    favicon: 'https://www.jointil.com/broadcast/images/joint.radio350X350.png',
    country: 'Israel'
  },
  {
    id: '9aba9171-6d18-4245-b948-4802720c194d',
    name: '=KECO=ROCK BALLADS',
    url: 'http://online.radioroks.ua/RadioROKS_Ballads_HD',
    favicon: 'api/img/default-radio-icon',
    country: 'Australia'
  },
  {
    id: 'e1662f68-e155-4c73-8973-b07e96330938',
    name: '0-24 2000ER POP ROCK',
    url: 'https://0-242000erpoprock.stream.laut.fm/0-24_2000er_pop_rock',
    favicon: 'api/img/default-radio-icon',
    country: 'Afghanistan'
  },
  {
    id: 'f509ca0d-b4fd-44fa-bf88-5a20ddbc7e2d',
    name: '012 Rock News',
    url: 'http://9881.brasilstream.com.br/stream',
    favicon: 'https://www.012news.com.br/wp-content/uploads/2022/07/novo-logo1.png',
    country: 'Brazil'
  },
  {
    id: '99a0a3ef-d6b6-42f8-bad8-63132543c363',
    name: '0nlineradio 80s ROCK',
    url: 'https://stream.0nlineradio.com/80s-rock?ref=radiobrowser',
    favicon: 'api/img/default-radio-icon',
    country: 'Germany'
  },
  {
    id: '96e2b3e5-21a0-45ee-8da9-f4870bfa5378',
    name: '0nlineradio CLASSIC ROCK',
    url: 'https://stream.0nlineradio.com/classic-rock?ref=radiobrowser',
    favicon: 'api/img/default-radio-icon',
    country: 'Germany'
  },
  {
    id: '6657e1a5-40a0-47e8-aabc-5c7debeaeff0',
    name: '0nlineradio DEUTSCHROCK',
    url: 'https://stream.0nlineradio.com/deutschrock?ref=radiobrowser',
    favicon: 'api/img/default-radio-icon',
    country: 'Germany'
  },
  {
    id: '8860e388-d794-4d93-abdd-7c5f84bd01b6',
    name: '0nlineradio ROCK',
    url: 'https://stream.0nlineradio.com/rock?ref=radiobrowser',
    favicon: 'api/img/default-radio-icon',
    country: 'Germany'
  },
  {
    id: '143caaf5-1354-442b-bc83-3bae08aa45c7',
    name: '0nlineradio SOFT ROCK',
    url: 'https://stream.0nlineradio.com/soft-rock?ref=radiobrowser',
    favicon: 'https://i.ibb.co/SJFG3bt/soft-rock.jpg',
    country: 'Germany'
  },
  {
    id: '962a67c2-0601-11e8-ae97-52543be04c81',
    name: '1.FM - Alternative Rock X Hits Radio',
    url: 'http://strm112.1.fm/x_mobile_mp3',
    favicon: 'api/img/default-radio-icon',
    country: 'Switzerland'
  },
  {
    id: '86b20e25-6719-4017-9592-e7f92de95dea',
    name: '1.FM - Classic Rock Replay Radio',
    url: 'http://strm112.1.fm/crock_mobile_mp3',
    favicon: 'http://i.imgur.com/Jmvwqen.jpg',
    country: 'Switzerland'
  },
  {
    id: '962a752e-0601-11e8-ae97-52543be04c81',
    name: '1.FM - Rock Classics Radio',
    url: 'http://strm112.1.fm/rockclassics_mobile_mp3',
    favicon: 'api/img/default-radio-icon',
    country: 'Switzerland'
  },
  {
    id: '962a0b5e-0601-11e8-ae97-52543be04c81',
    name: '1.FM - Samba Rock Radio',
    url: 'http://strm112.1.fm/sambarock_mobile_mp3',
    favicon: 'api/img/default-radio-icon',
    country: 'Switzerland'
  },
  {
    id: 'c3086993-34c3-47cb-9323-540fb675fe46',
    name: '1.fm classic rock',
    url: 'https://strm112.1.fm/crock_mobile_mp3',
    favicon: 'api/img/default-radio-icon',
    country: 'Switzerland'
  },
  {
    id: 'd0cad744-b631-49db-94e8-f8469f798cb1',
    name: '100hitz - Indie Rock',
    url: 'http://pureplay.cdnstream1.com/6056_64.aac?DIST=TuneIn&TGT=TuneIn&maxServers=2&gdpr=0&us_privacy=1YNY&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTYzMzk1ODAzMywiaXNzIjoidGlzcnYifQ.iRK4czQtolWgtNsj8Uy5lioP0EoZu1wCuvj2VwsCs3o',
    favicon: 'https://100hitz.com/favicon.ico',
    country: 'The United States Of America'
  }
];

module.exports = formattedStations;
