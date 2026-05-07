export interface StateInfo {
  code: string;
  name: string;
  slug: string;
  capital: string;
  popularCities: string[];
  avgHomePrice: number;
  medianRate: number;
}

export const US_STATES: StateInfo[] = [
  { code: "AL", name: "Alabama", slug: "alabama", capital: "Montgomery", popularCities: ["Birmingham","Huntsville","Mobile"], avgHomePrice: 235000, medianRate: 6.49 },
  { code: "AK", name: "Alaska", slug: "alaska", capital: "Juneau", popularCities: ["Anchorage","Fairbanks"], avgHomePrice: 365000, medianRate: 6.55 },
  { code: "AZ", name: "Arizona", slug: "arizona", capital: "Phoenix", popularCities: ["Phoenix","Tucson","Mesa","Scottsdale"], avgHomePrice: 425000, medianRate: 6.49 },
  { code: "AR", name: "Arkansas", slug: "arkansas", capital: "Little Rock", popularCities: ["Little Rock","Fayetteville"], avgHomePrice: 205000, medianRate: 6.52 },
  { code: "CA", name: "California", slug: "california", capital: "Sacramento", popularCities: ["Los Angeles","San Diego","San Francisco","San Jose","Sacramento"], avgHomePrice: 765000, medianRate: 6.45 },
  { code: "CO", name: "Colorado", slug: "colorado", capital: "Denver", popularCities: ["Denver","Colorado Springs","Aurora","Boulder"], avgHomePrice: 555000, medianRate: 6.49 },
  { code: "CT", name: "Connecticut", slug: "connecticut", capital: "Hartford", popularCities: ["Hartford","New Haven","Stamford"], avgHomePrice: 395000, medianRate: 6.52 },
  { code: "DE", name: "Delaware", slug: "delaware", capital: "Dover", popularCities: ["Wilmington","Dover"], avgHomePrice: 345000, medianRate: 6.5 },
  { code: "FL", name: "Florida", slug: "florida", capital: "Tallahassee", popularCities: ["Miami","Orlando","Tampa","Jacksonville","Fort Lauderdale"], avgHomePrice: 415000, medianRate: 6.49 },
  { code: "GA", name: "Georgia", slug: "georgia", capital: "Atlanta", popularCities: ["Atlanta","Savannah","Augusta"], avgHomePrice: 325000, medianRate: 6.5 },
  { code: "HI", name: "Hawaii", slug: "hawaii", capital: "Honolulu", popularCities: ["Honolulu","Hilo"], avgHomePrice: 845000, medianRate: 6.55 },
  { code: "ID", name: "Idaho", slug: "idaho", capital: "Boise", popularCities: ["Boise","Idaho Falls"], avgHomePrice: 445000, medianRate: 6.52 },
  { code: "IL", name: "Illinois", slug: "illinois", capital: "Springfield", popularCities: ["Chicago","Aurora","Naperville"], avgHomePrice: 265000, medianRate: 6.49 },
  { code: "IN", name: "Indiana", slug: "indiana", capital: "Indianapolis", popularCities: ["Indianapolis","Fort Wayne","Evansville"], avgHomePrice: 235000, medianRate: 6.5 },
  { code: "IA", name: "Iowa", slug: "iowa", capital: "Des Moines", popularCities: ["Des Moines","Cedar Rapids"], avgHomePrice: 215000, medianRate: 6.52 },
  { code: "KS", name: "Kansas", slug: "kansas", capital: "Topeka", popularCities: ["Wichita","Kansas City"], avgHomePrice: 225000, medianRate: 6.5 },
  { code: "KY", name: "Kentucky", slug: "kentucky", capital: "Frankfort", popularCities: ["Louisville","Lexington"], avgHomePrice: 215000, medianRate: 6.52 },
  { code: "LA", name: "Louisiana", slug: "louisiana", capital: "Baton Rouge", popularCities: ["New Orleans","Baton Rouge","Shreveport"], avgHomePrice: 215000, medianRate: 6.55 },
  { code: "ME", name: "Maine", slug: "maine", capital: "Augusta", popularCities: ["Portland","Bangor"], avgHomePrice: 365000, medianRate: 6.52 },
  { code: "MD", name: "Maryland", slug: "maryland", capital: "Annapolis", popularCities: ["Baltimore","Annapolis","Frederick"], avgHomePrice: 415000, medianRate: 6.5 },
  { code: "MA", name: "Massachusetts", slug: "massachusetts", capital: "Boston", popularCities: ["Boston","Worcester","Cambridge"], avgHomePrice: 595000, medianRate: 6.49 },
  { code: "MI", name: "Michigan", slug: "michigan", capital: "Lansing", popularCities: ["Detroit","Grand Rapids","Ann Arbor"], avgHomePrice: 235000, medianRate: 6.5 },
  { code: "MN", name: "Minnesota", slug: "minnesota", capital: "Saint Paul", popularCities: ["Minneapolis","Saint Paul","Rochester"], avgHomePrice: 325000, medianRate: 6.49 },
  { code: "MS", name: "Mississippi", slug: "mississippi", capital: "Jackson", popularCities: ["Jackson","Gulfport"], avgHomePrice: 185000, medianRate: 6.55 },
  { code: "MO", name: "Missouri", slug: "missouri", capital: "Jefferson City", popularCities: ["Kansas City","St. Louis","Springfield"], avgHomePrice: 235000, medianRate: 6.5 },
  { code: "MT", name: "Montana", slug: "montana", capital: "Helena", popularCities: ["Billings","Missoula","Bozeman"], avgHomePrice: 445000, medianRate: 6.55 },
  { code: "NE", name: "Nebraska", slug: "nebraska", capital: "Lincoln", popularCities: ["Omaha","Lincoln"], avgHomePrice: 235000, medianRate: 6.52 },
  { code: "NV", name: "Nevada", slug: "nevada", capital: "Carson City", popularCities: ["Las Vegas","Henderson","Reno"], avgHomePrice: 425000, medianRate: 6.5 },
  { code: "NH", name: "New Hampshire", slug: "new-hampshire", capital: "Concord", popularCities: ["Manchester","Nashua"], avgHomePrice: 445000, medianRate: 6.5 },
  { code: "NJ", name: "New Jersey", slug: "new-jersey", capital: "Trenton", popularCities: ["Newark","Jersey City","Princeton"], avgHomePrice: 485000, medianRate: 6.49 },
  { code: "NM", name: "New Mexico", slug: "new-mexico", capital: "Santa Fe", popularCities: ["Albuquerque","Santa Fe"], avgHomePrice: 295000, medianRate: 6.55 },
  { code: "NY", name: "New York", slug: "new-york", capital: "Albany", popularCities: ["New York City","Buffalo","Rochester","Albany"], avgHomePrice: 485000, medianRate: 6.49 },
  { code: "NC", name: "North Carolina", slug: "north-carolina", capital: "Raleigh", popularCities: ["Charlotte","Raleigh","Durham","Greensboro"], avgHomePrice: 325000, medianRate: 6.5 },
  { code: "ND", name: "North Dakota", slug: "north-dakota", capital: "Bismarck", popularCities: ["Fargo","Bismarck"], avgHomePrice: 245000, medianRate: 6.55 },
  { code: "OH", name: "Ohio", slug: "ohio", capital: "Columbus", popularCities: ["Columbus","Cleveland","Cincinnati"], avgHomePrice: 215000, medianRate: 6.5 },
  { code: "OK", name: "Oklahoma", slug: "oklahoma", capital: "Oklahoma City", popularCities: ["Oklahoma City","Tulsa"], avgHomePrice: 205000, medianRate: 6.52 },
  { code: "OR", name: "Oregon", slug: "oregon", capital: "Salem", popularCities: ["Portland","Eugene","Salem"], avgHomePrice: 495000, medianRate: 6.5 },
  { code: "PA", name: "Pennsylvania", slug: "pennsylvania", capital: "Harrisburg", popularCities: ["Philadelphia","Pittsburgh","Allentown"], avgHomePrice: 255000, medianRate: 6.5 },
  { code: "RI", name: "Rhode Island", slug: "rhode-island", capital: "Providence", popularCities: ["Providence","Warwick"], avgHomePrice: 425000, medianRate: 6.52 },
  { code: "SC", name: "South Carolina", slug: "south-carolina", capital: "Columbia", popularCities: ["Charleston","Columbia","Greenville"], avgHomePrice: 295000, medianRate: 6.52 },
  { code: "SD", name: "South Dakota", slug: "south-dakota", capital: "Pierre", popularCities: ["Sioux Falls","Rapid City"], avgHomePrice: 295000, medianRate: 6.55 },
  { code: "TN", name: "Tennessee", slug: "tennessee", capital: "Nashville", popularCities: ["Nashville","Memphis","Knoxville"], avgHomePrice: 325000, medianRate: 6.5 },
  { code: "TX", name: "Texas", slug: "texas", capital: "Austin", popularCities: ["Houston","Dallas","Austin","San Antonio","Fort Worth"], avgHomePrice: 345000, medianRate: 6.49 },
  { code: "UT", name: "Utah", slug: "utah", capital: "Salt Lake City", popularCities: ["Salt Lake City","Provo","Ogden"], avgHomePrice: 515000, medianRate: 6.5 },
  { code: "VT", name: "Vermont", slug: "vermont", capital: "Montpelier", popularCities: ["Burlington","Montpelier"], avgHomePrice: 365000, medianRate: 6.55 },
  { code: "VA", name: "Virginia", slug: "virginia", capital: "Richmond", popularCities: ["Virginia Beach","Richmond","Arlington","Norfolk"], avgHomePrice: 395000, medianRate: 6.49 },
  { code: "WA", name: "Washington", slug: "washington", capital: "Olympia", popularCities: ["Seattle","Spokane","Tacoma","Bellevue"], avgHomePrice: 615000, medianRate: 6.49 },
  { code: "WV", name: "West Virginia", slug: "west-virginia", capital: "Charleston", popularCities: ["Charleston","Huntington"], avgHomePrice: 165000, medianRate: 6.55 },
  { code: "WI", name: "Wisconsin", slug: "wisconsin", capital: "Madison", popularCities: ["Milwaukee","Madison","Green Bay"], avgHomePrice: 265000, medianRate: 6.5 },
  { code: "WY", name: "Wyoming", slug: "wyoming", capital: "Cheyenne", popularCities: ["Cheyenne","Casper"], avgHomePrice: 345000, medianRate: 6.55 },
];

export const getStateBySlug = (slug: string) => US_STATES.find((s) => s.slug === slug);
