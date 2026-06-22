// Demo TMDB-shaped movies — poster images load from TMDB CDN without an API key
export const DEMO_MOVIES_BY_MOOD = {
  happy: [
    { id: 10020, title: 'Beauty and the Beast', poster_path: '/vgnoBSVzWnpbgudNeBeNiRUVkIq.jpg', vote_average: 7.7, release_date: '1991-11-13' },
    { id: 8587, title: 'The Lion King', poster_path: '/sKCr78MXSLixwmZ8DyJLRetM8MW.jpg', vote_average: 8.3, release_date: '1994-06-15' },
    { id: 10530, title: 'Pulp Fiction', poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', vote_average: 8.5, release_date: '1994-09-10' },
    { id: 13, title: 'Forrest Gump', poster_path: '/arw2vcBveWOVZr6pxd9vT035pBM.jpg', vote_average: 8.5, release_date: '1994-06-23' },
    { id: 862, title: 'Toy Story', poster_path: '/uXDfjJbdP4ijW5hWSBrPrlAhRGu.jpg', vote_average: 8.0, release_date: '1995-10-30' },
    { id: 2062, title: 'Ratatouille', poster_path: '/t3vaCRPFfYwlF72qZ7W2ijq5Vyz.jpg', vote_average: 7.8, release_date: '2007-06-27' },
  ],
  sad: [
    { id: 597, title: 'Titanic', poster_path: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', vote_average: 7.9, release_date: '1997-11-18' },
    { id: 73, title: 'The Green Mile', poster_path: '/velWPhVMQeQKcxggNEu8g9GgY6x.jpg', vote_average: 8.5, release_date: '1999-12-10' },
    { id: 424, title: "Schindler's List", poster_path: '/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg', vote_average: 8.6, release_date: '1993-12-15' },
    { id: 550, title: 'Fight Club', poster_path: '/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg', vote_average: 8.4, release_date: '1999-10-15' },
    { id: 11216, title: 'Cinema Paradiso', poster_path: '/8SRUfRUi6x4O68n0VCbDNRa6iFT.jpg', vote_average: 8.4, release_date: '1988-11-17' },
    { id: 489, title: 'Good Will Hunting', poster_path: '/bABCBKYBK7WhITdZfl1FhkOyDdS.jpg', vote_average: 8.2, release_date: '1997-12-05' },
  ],
  motivated: [
    { id: 278, title: 'The Shawshank Redemption', poster_path: '/q6y0Go1tsGEsmtFryDOd3pxma3u.jpg', vote_average: 8.7, release_date: '1994-09-23' },
    { id: 424694, title: 'Bohemian Rhapsody', poster_path: '/lHu1WTNCOcIPI7E66c2sBFBZbpz.jpg', vote_average: 8.0, release_date: '2018-10-24' },
    { id: 10625, title: 'Rocky', poster_path: '/i0Fd6Y9hYdOQ0Zam2Tl4p2eJcpw.jpg', vote_average: 7.8, release_date: '1976-11-21' },
    { id: 152532, title: 'Dallas Buyers Club', poster_path: '/vQ0HXghH0oXlbWfYaLx8kpt4mQ2.jpg', vote_average: 7.9, release_date: '2013-11-22' },
    { id: 106646, title: 'The Wolf of Wall Street', poster_path: '/34m2tygAYBGqA9MXKhRDsYd4VKH.jpg', vote_average: 8.0, release_date: '2013-12-25' },
    { id: 157336, title: 'Interstellar', poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', vote_average: 8.4, release_date: '2014-11-06' },
  ],
  romantic: [
    { id: 313369, title: 'La La Land', poster_path: '/uDO8zWDhfWwoFdKS4f1vN6Ry4iq.jpg', vote_average: 7.9, release_date: '2016-12-01' },
    { id: 11036, title: 'The Notebook', poster_path: '/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg', vote_average: 7.8, release_date: '2004-06-25' },
    { id: 3131, title: 'Gone with the Wind', poster_path: '/hBpkm0pR6TABqDC4mKwzruGgj0b.jpg', vote_average: 7.9, release_date: '1939-12-15' },
    { id: 597, title: 'Titanic', poster_path: '/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg', vote_average: 7.9, release_date: '1997-11-18' },
    { id: 114, title: 'Pretty Woman', poster_path: '/jQgK4AMYi9xQGFWLZwYxo9vt7uk.jpg', vote_average: 7.5, release_date: '1990-03-23' },
    { id: 152601, title: 'Her', poster_path: '/5vHssUeVe25bMrof1gYaNOfikS3.jpg', vote_average: 7.9, release_date: '2013-12-18' },
  ],
  adventurous: [
    { id: 157336, title: 'Interstellar', poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', vote_average: 8.4, release_date: '2014-11-06' },
    { id: 120, title: 'The Lord of the Rings: The Fellowship of the Ring', poster_path: '/6oom5QYQ2yQTM6fnnJsqm4AIri4.jpg', vote_average: 8.4, release_date: '2001-12-18' },
    { id: 329, title: 'Jurassic Park', poster_path: '/bRKJbe5TAMfQH7dFuM3sp3or6Qv.jpg', vote_average: 8.0, release_date: '1993-06-11' },
    { id: 16869, title: 'Inglourious Basterds', poster_path: '/7sfbegoSzOq7qiFfjxXFn7J87S.jpg', vote_average: 8.2, release_date: '2009-08-20' },
    { id: 49026, title: 'The Dark Knight Rises', poster_path: '/hmqwx0hYYmT7b3lf4hriykjTOD3.jpg', vote_average: 7.8, release_date: '2012-07-17' },
    { id: 1771, title: 'Captain America: The First Avenger', poster_path: '/vSNxAJTlDpnrNW11CNGTt9NYweu.jpg', vote_average: 7.0, release_date: '2011-07-22' },
  ],
  thriller: [
    { id: 475557, title: 'Joker', poster_path: '/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg', vote_average: 8.2, release_date: '2019-10-01' },
    { id: 680, title: 'Pulp Fiction', poster_path: '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg', vote_average: 8.5, release_date: '1994-09-10' },
    { id: 807, title: 'Se7en', poster_path: '/6yoghtyTpznpBik8EngEmJskVUO.jpg', vote_average: 8.4, release_date: '1995-09-22' },
    { id: 274, title: 'The Silence of the Lambs', poster_path: '/uS9m8OBk1A8eM9Igb1WmrJk6x7q.jpg', vote_average: 8.3, release_date: '1991-02-14' },
    { id: 694, title: 'The Shining', poster_path: '/9fgh3Ns1iRzlQNYuFpNcEug5oY.jpg', vote_average: 8.2, release_date: '1980-05-23' },
    { id: 745, title: 'The Sixth Sense', poster_path: '/fSVzguIZWq8xnne2q2Y60w2xJvg.jpg', vote_average: 7.9, release_date: '1999-08-06' },
  ],
};

export const DEMO_TRENDING = [
  { id: 872585, title: 'Oppenheimer', poster_path: '/8Gxv8gSFCU0XGDykEGv7zR1nGlU.jpg', vote_average: 8.1, release_date: '2023-07-19' },
  { id: 346698, title: 'Barbie', poster_path: '/iuFNBM7JPXb6oYhm55Y4LyZXyJd.jpg', vote_average: 6.9, release_date: '2023-07-19' },
  { id: 299536, title: 'Avengers: Infinity War', poster_path: '/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg', vote_average: 8.3, release_date: '2018-04-25' },
  { id: 634649, title: 'Spider-Man: No Way Home', poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg', vote_average: 7.9, release_date: '2021-12-15' },
  { id: 361743, title: 'Top Gun: Maverick', poster_path: '/62HCnUMzZJ8bi9e1VruIoT5qac7.jpg', vote_average: 8.3, release_date: '2022-05-24' },
  { id: 505642, title: 'Black Panther: Wakanda Forever', poster_path: '/sv1xJUazXeYqALzczSZ3Pn6WIht.jpg', vote_average: 7.3, release_date: '2022-11-09' },
];

export function getDemoMoviesForList(listId, moodId) {
  if (listId === 'mood') {
    return DEMO_MOVIES_BY_MOOD[moodId] ?? DEMO_MOVIES_BY_MOOD.happy;
  }
  if (listId === 'trending' || listId === 'popular' || listId === 'top') {
    return DEMO_TRENDING;
  }
  return [];
}
