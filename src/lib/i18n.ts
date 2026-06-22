import type { ChapterId, ScaleMode } from "@/lib/story";

export type Language = "en" | "hu" | "ro";

type ModeCopy = {
  label: string;
  shortLabel: string;
  question: string;
  summary: string;
};

type ChapterCopy = {
  title: string;
  intro: string;
};

type StoryCopy = {
  hook: string;
  detail: string;
};

type CautionCopy = {
  badge: string;
  text: string;
};

export type Translation = {
  languageName: string;
  nav: {
    brand: string;
    story: string;
    button: string;
    chapters: string;
    atlas: string;
    compare: string;
    sources: string;
    caution: string;
    open: string;
    openNavigation: string;
    closeNavigation: string;
    skip: string;
    language: string;
    theme: string;
  };
  loading: {
    title: string;
    detail: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    thesis: string;
    subtitle: string;
    datasets: string;
    datasetsDetail: string;
    scaleViews: string;
    scaleViewsDetail: string;
    sourceObservations: string;
    chapters: string;
    cta: string;
    modePickerLabel: string;
  };
  opening: {
    kicker: string;
    title: string;
    lines: string[];
    reveal: string;
    revealStrong: string;
  };
  machine: {
    index: string;
    title: string;
    body: string;
    visualStraightness: string;
    noDataset: string;
  };
  feature: {
    label: string;
    meaningPrefix: string;
    score: string;
    evidence: string;
    observations: string;
    maximum: string;
    mean: string;
    ordersOfRange: string;
    largestObservations: string;
  };
  atlas: {
    index: string;
    title: string;
    body: string;
    all: string;
    datasetsInView: string;
    datasetsInChapter: string;
    visualStraightness: string;
    filterLabel: string;
  };
  comparison: {
    index: string;
    title: string;
    body: string;
    showingPrefix: string;
  };
  caution: {
    index: string;
    title: string;
    body: string;
    readCarefully: string;
    note: string;
  };
  sources: {
    index: string;
    title: string;
    body: string;
    dataAndCitations: string;
  };
  closing: {
    kicker: string;
    title: string;
    copy: string;
    sequence: Record<ScaleMode, string>;
    finalA: string;
    finalB: string;
    restart: string;
  };
  footer: {
    built: string;
  };
  chart: {
    linearSide: string;
    transformedSide: string;
    frequency: string;
    rank: string;
    value: string;
    rawRank: string;
    logRank: string;
    logValue: string;
    tailThreshold: string;
    tailProbability: string;
    atLeast: string;
  };
  scaleModes: Record<ScaleMode, ModeCopy>;
  chapters: Record<ChapterId, ChapterCopy>;
  stories: Record<string, StoryCopy>;
  cautions: Record<string, CautionCopy>;
  datasetTitles: Record<string, string>;
  categories: Record<string, string>;
  units: Record<string, string>;
};

export const languageOptions: Array<{
  code: Language;
  label: string;
  shortLabel: string;
}> = [
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "hu", label: "Magyar", shortLabel: "HU" },
  { code: "ro", label: "Romana", shortLabel: "RO" },
];

const datasetTitlesEn = {
  "bank-assets-fdic": "Bank Assets",
  "body-size-pantheria": "Body Sizes",
  "citations-openalex-2020-top": "Scientific Citations",
  "city-populations-geonames": "City Populations",
  "conflict-fatalities-ucdp-ged-26-1": "Conflict Fatalities",
  "country-gdp-worldbank-2024": "Country GDP",
  "debt-securities-bis-2025q4": "Debt Securities",
  "earthquakes-usgs-2025": "Earthquakes",
  "exoplanets-nasa-orbital-periods": "Exoplanets",
  "firm-assets-sec-2026q1": "Firm Size",
  "flight-delays-bts-2025-01": "Flight Delays",
  "household-assets-scf-2022": "Household Assets",
  "household-debt-scf-2022": "Household Debt",
  "household-income-scf-2022": "Household Income",
  "household-net-worth-scf-2022": "Household Net Worth",
  "open-source-downloads-pypi-2025-12": "Open-Source Package Downloads",
  "pollution-openmeteo-nyc-2025": "Air Pollution Spikes",
  "social-network-snap-facebook": "Social Network Degrees",
  "species-observations-gbif-2025": "Species Observations",
  "storm-damage-noaa-2025": "Weather Disaster Damage",
  "taxi-trip-distances-nyc-tlc-2025-01": "Taxi Trip Distances",
  "transit-headways-mbta-gtfs": "Bus/Train Scheduled Headways",
  "us-market-absolute-returns-french": "Stock-Market Extreme Returns",
  "us-market-shock-waiting-times-french": "Waiting Times Between Stock Shocks",
  "wikipedia-pageviews-2025-12-31": "Wikipedia Pageviews",
  "wildfires-mtbs-1984-2024": "Wildfires",
  "word-frequency-gutenberg-moby-dick": "Word Frequencies",
};

const datasetTitlesHu = {
  "bank-assets-fdic": "Banki eszkozok",
  "body-size-pantheria": "Testmeretek",
  "citations-openalex-2020-top": "Tudomanyos hivatkozasok",
  "city-populations-geonames": "Varosok nepessege",
  "conflict-fatalities-ucdp-ged-26-1": "Konfliktusok halalos aldozatai",
  "country-gdp-worldbank-2024": "Orszagok GDP-je",
  "debt-securities-bis-2025q4": "Adossagpapir-allomany",
  "earthquakes-usgs-2025": "Foldrengesek",
  "exoplanets-nasa-orbital-periods": "Exobolygok",
  "firm-assets-sec-2026q1": "Vallalatmeret",
  "flight-delays-bts-2025-01": "Repulesi kesesek",
  "household-assets-scf-2022": "Haztartasi eszkozok",
  "household-debt-scf-2022": "Haztartasi adossag",
  "household-income-scf-2022": "Haztartasi jovedelem",
  "household-net-worth-scf-2022": "Haztartasi netto vagyon",
  "open-source-downloads-pypi-2025-12": "Nyilt forrasu csomagletoltesek",
  "pollution-openmeteo-nyc-2025": "Legszennyezesi kiugrasok",
  "social-network-snap-facebook": "Kozossegi halozati fokszamok",
  "species-observations-gbif-2025": "Fajmegfigyelesek",
  "storm-damage-noaa-2025": "Idojarasi katasztrofakarok",
  "taxi-trip-distances-nyc-tlc-2025-01": "Taxitutak tavolsaga",
  "transit-headways-mbta-gtfs": "Busz- es vonatkovetesi idok",
  "us-market-absolute-returns-french": "Tozsdei szelsoseges hozamok",
  "us-market-shock-waiting-times-french": "Varakozas tozsdei sokkok kozott",
  "wikipedia-pageviews-2025-12-31": "Wikipedia oldalmegtekintesek",
  "wildfires-mtbs-1984-2024": "Erdotuzek",
  "word-frequency-gutenberg-moby-dick": "Szogyakorisagok",
};

const datasetTitlesRo = {
  "bank-assets-fdic": "Active bancare",
  "body-size-pantheria": "Dimensiuni corporale",
  "citations-openalex-2020-top": "Citari stiintifice",
  "city-populations-geonames": "Populatii urbane",
  "conflict-fatalities-ucdp-ged-26-1": "Victime in conflicte",
  "country-gdp-worldbank-2024": "PIB pe tari",
  "debt-securities-bis-2025q4": "Titluri de datorie",
  "earthquakes-usgs-2025": "Cutremure",
  "exoplanets-nasa-orbital-periods": "Exoplanete",
  "firm-assets-sec-2026q1": "Dimensiunea firmelor",
  "flight-delays-bts-2025-01": "Intarzieri de zbor",
  "household-assets-scf-2022": "Activele gospodariilor",
  "household-debt-scf-2022": "Datoriile gospodariilor",
  "household-income-scf-2022": "Venitul gospodariilor",
  "household-net-worth-scf-2022": "Averea neta a gospodariilor",
  "open-source-downloads-pypi-2025-12": "Descarcari pachete open-source",
  "pollution-openmeteo-nyc-2025": "Varfuri de poluare",
  "social-network-snap-facebook": "Grade in retele sociale",
  "species-observations-gbif-2025": "Observatii de specii",
  "storm-damage-noaa-2025": "Pagube din fenomene meteo",
  "taxi-trip-distances-nyc-tlc-2025-01": "Distante curse taxi",
  "transit-headways-mbta-gtfs": "Intervale programate bus/tren",
  "us-market-absolute-returns-french": "Randamente bursiere extreme",
  "us-market-shock-waiting-times-french": "Timpi intre socuri bursiere",
  "wikipedia-pageviews-2025-12-31": "Vizualizari Wikipedia",
  "wildfires-mtbs-1984-2024": "Incendii de vegetatie",
  "word-frequency-gutenberg-moby-dick": "Frecvente de cuvinte",
};

const storiesEn: Record<string, StoryCopy> = {
  "transit-headways-mbta-gtfs": {
    hook: "A timetable promises regularity. Scheduled departure gaps already show a longer edge.",
    detail: "These are scheduled MBTA headways at the first stop, not observed arrivals or passenger waiting times.",
  },
  "flight-delays-bts-2025-01": {
    hook: "Most positive delays are survivable. A small fraction are the ones that ruin the day.",
    detail: "January 2025 US flights with a positive arrival delay. In the tail view, height means the chance of a delay at least that long.",
  },
  "taxi-trip-distances-nyc-tlc-2025-01": {
    hook: "New York moves mostly in short hops, interrupted by rare journeys across the urban region.",
    detail: "More than 3.3 million valid yellow taxi trips from January 2025. The curve is heavy but visibly not one clean power law.",
  },
  "earthquakes-usgs-2025": {
    hook: "Small earthquakes happen constantly. The rare event carries an entirely different amount of energy.",
    detail: "Worldwide magnitude 2.5 and larger events in 2025. Relative energy is derived from the reported magnitude.",
  },
  "us-market-absolute-returns-french": {
    hook: "The market looks calm until the tail moves.",
    detail: "Absolute daily US market returns from the Kenneth French factors series. The chart describes magnitude, not direction.",
  },
  "wildfires-mtbs-1984-2024": {
    hook: "Most recorded large fires stay near the program threshold. A few redraw landscapes.",
    detail: "MTBS large US wildfire and wildland-fire-use boundaries from 1984 through 2024.",
  },
  "storm-damage-noaa-2025": {
    hook: "Damage is not evenly distributed across storms.",
    detail: "Reported property and crop damage for 2025 US storm events. Zero and missing damage records are excluded.",
  },
  "pollution-openmeteo-nyc-2025": {
    hook: "An annual average can hide the hours when breathing conditions become dangerous.",
    detail: "Hourly New York City PM2.5 estimates for 2025. Its limited range makes a log-log claim especially unconvincing.",
  },
  "conflict-fatalities-ucdp-ged-26-1": {
    hook: "Recorded violence is concentrated: a small number of events account for a disproportionate loss of life.",
    detail: "UCDP event-level best estimates from 1989 through 2025. Zero-fatality records are omitted; every point represents human loss.",
  },
  "household-net-worth-scf-2022": {
    hook: "Wealth is not spread like height or age. The upper tail keeps going.",
    detail: "Positive 2022 US household net worth from the Survey of Consumer Finances. Tail probabilities and means use survey weights.",
  },
  "household-income-scf-2022": {
    hook: "Income is uneven, though its upper tail has a different shape from accumulated wealth.",
    detail: "Positive 2022 SCF income observations with survey-weighted tail probabilities.",
  },
  "household-assets-scf-2022": {
    hook: "Asset ownership stretches across almost ten orders of magnitude in the positive extract.",
    detail: "Positive 2022 SCF household assets. Logarithmic charts necessarily exclude zero and negative values.",
  },
  "household-debt-scf-2022": {
    hook: "Debt is concentrated too, but not in exactly the same shape as wealth or assets.",
    detail: "Positive 2022 SCF household debt with survey-weighted tail probabilities.",
  },
  "country-gdp-worldbank-2024": {
    hook: "A small group of economies carries much of global output.",
    detail: "Country GDP in current US dollars for 2024. World Bank aggregate regions are excluded.",
  },
  "firm-assets-sec-2026q1": {
    hook: "Public-company assets span a vast range, but the curve refuses one simple scale story.",
    detail: "Total assets from annual-style filings in the SEC 2026 Q1 Financial Statement Data Set.",
  },
  "bank-assets-fdic": {
    hook: "The financial system concentrates inside a small number of very large institutions.",
    detail: "Total assets for active FDIC-insured institutions, converted from thousands to US dollars.",
  },
  "debt-securities-bis-2025q4": {
    hook: "Borrowing in global capital markets is highly concentrated across issuing economies.",
    detail: "Outstanding resident-issued debt securities for 39 countries in 2025 Q4.",
  },
  "city-populations-geonames": {
    hook: "A few megacities tower over tens of thousands of smaller places.",
    detail: "Population values from the GeoNames cities15000 database.",
  },
  "social-network-snap-facebook": {
    hook: "Most nodes have modest degree. A smaller number become hubs, but not along a clean power law here.",
    detail: "Node degree calculated from the undirected SNAP Facebook combined edge list.",
  },
  "word-frequency-gutenberg-moby-dick": {
    hook: "A few words carry the language of an entire novel.",
    detail: "Word counts computed from the Project Gutenberg plain-text edition of Moby-Dick. This is the classic rank-frequency reveal.",
  },
  "citations-openalex-2020-top": {
    hook: "A few papers become intellectual giants while attention falls away rapidly down the ranking.",
    detail: "The 1,000 most-cited OpenAlex works published in 2020; this is a top-ranked extract, not the full corpus.",
  },
  "wikipedia-pageviews-2025-12-31": {
    hook: "Millions of pages exist. On any given day, attention floods into a very small number.",
    detail: "The top 999 English Wikipedia articles by pageviews on December 31, 2025.",
  },
  "open-source-downloads-pypi-2025-12": {
    hook: "Modern software rests on a small set of invisible infrastructure packages.",
    detail: "The top 100,000 PyPI package names by downloads in December 2025. Automated traffic may be included.",
  },
  "species-observations-gbif-2025": {
    hook: "Some species are recorded everywhere. Many remain nearly invisible in the observation database.",
    detail: "Top GBIF scientific-name occurrence counts for 2025. Records are not estimates of true population abundance.",
  },
  "body-size-pantheria": {
    hook: "Mammal life occupies astonishingly different physical scales.",
    detail: "Adult body mass from the PanTHERIA mammal life-history database.",
  },
  "exoplanets-nasa-orbital-periods": {
    hook: "Log scales reveal cosmic variety even when the pattern is not a pure power law.",
    detail: "Confirmed exoplanet orbital periods from the NASA Exoplanet Archive composite parameters table.",
  },
  "us-market-shock-waiting-times-french": {
    hook: "Calm periods cluster. Shocks cluster too.",
    detail: "Trading-day gaps between US market moves with an absolute return of at least 3%. The intervals are derived from real daily returns.",
  },
};

const storiesHu: Record<string, StoryCopy> = Object.fromEntries(
  Object.entries(storiesEn).map(([id, story]) => [
    id,
    {
      hook: story.hook,
      detail: story.detail,
    },
  ]),
);

Object.assign(storiesHu, {
  "word-frequency-gutenberg-moby-dick": {
    hook: "Nehany szo hordozza egy teljes regeny nyelvet.",
    detail: "Szogyakorisagok a Project Gutenberg Moby-Dick szovegebol. Ez a klasszikus rang-gyakorisagi feltaras.",
  },
  "flight-delays-bts-2025-01": {
    hook: "A legtobb keses kezelheto. A napot a ritka, hosszu kesesek teszik tonkre.",
    detail: "2025 januarjaban kesve erkezo amerikai jaratok. A faroknezet azt mutatja, mekkora esellyel legalabb ilyen hosszu a keses.",
  },
  "earthquakes-usgs-2025": {
    hook: "Kis foldrengesek allandoan vannak. A ritka nagy esemeny teljesen mas energiaszint.",
    detail: "Vilagszerte 2,5-os vagy nagyobb magnitudoju esemenyek 2025-ben. A relativ energia a jelentett magnitudobol szarmazik.",
  },
  "household-net-worth-scf-2022": {
    hook: "A vagyon nem ugy oszlik el, mint a testmagassag. A felso farok tovabb nyulik.",
    detail: "Pozitiv amerikai haztartasi netto vagyon a 2022-es Survey of Consumer Finances alapjan. A farokvaloszinusegek sulyozottak.",
  },
  "us-market-shock-waiting-times-french": {
    hook: "A nyugodt idoszakok csoportosulnak. A sokkok is.",
    detail: "Kereskedesi napok szama az amerikai piacon legalabb 3%-os abszolut elmozdulasok kozott.",
  },
});

const storiesRo: Record<string, StoryCopy> = Object.fromEntries(
  Object.entries(storiesEn).map(([id, story]) => [
    id,
    {
      hook: story.hook,
      detail: story.detail,
    },
  ]),
);

Object.assign(storiesRo, {
  "word-frequency-gutenberg-moby-dick": {
    hook: "Cateva cuvinte poarta limba unui intreg roman.",
    detail: "Numarari de cuvinte din editia text Project Gutenberg a romanului Moby-Dick. Este revelatia clasica rang-frecventa.",
  },
  "flight-delays-bts-2025-01": {
    hook: "Cele mai multe intarzieri sunt suportabile. O mica parte strica intreaga zi.",
    detail: "Zboruri americane din ianuarie 2025 cu intarziere pozitiva la sosire. In vederea cozii, inaltimea arata sansa unei intarzieri cel putin atat de lungi.",
  },
  "earthquakes-usgs-2025": {
    hook: "Cutremurele mici apar constant. Evenimentul rar are un nivel complet diferit de energie.",
    detail: "Evenimente mondiale de magnitudine 2,5 sau mai mare in 2025. Energia relativa este derivata din magnitudinea raportata.",
  },
  "household-net-worth-scf-2022": {
    hook: "Averea nu se distribuie ca inaltimea sau varsta. Coada superioara continua.",
    detail: "Avere neta pozitiva a gospodariilor SUA in 2022 din Survey of Consumer Finances. Probabilitatile din coada folosesc ponderi de sondaj.",
  },
  "us-market-shock-waiting-times-french": {
    hook: "Perioadele calme se grupeaza. Si socurile se grupeaza.",
    detail: "Intervale in zile de tranzactionare intre miscari ale pietei SUA cu randament absolut de cel putin 3%.",
  },
});

Object.assign(storiesHu, {
  "transit-headways-mbta-gtfs": {
    hook: "A menetrend szabalyossagot iger. A tervezett indulasi resek mar hosszu peremet mutatnak.",
    detail: "Ezek az MBTA elso megalloihoz tartozo menetrendi kovetesi idok, nem megfigyelt erkezesek vagy utasvarakozasok.",
  },
  "flight-delays-bts-2025-01": {
    hook: "A legtobb keses kezelheto. A napot a ritka, hosszu kesesek teszik tonkre.",
    detail: "2025 januarjaban kesve erkezo amerikai jaratok. A faroknezet azt mutatja, mekkora esellyel legalabb ilyen hosszu a keses.",
  },
  "taxi-trip-distances-nyc-tlc-2025-01": {
    hook: "New York tobbnyire rovid ugrasokban mozog, ritka, hosszu varosi utakkal megszakitva.",
    detail: "Tobb mint 3,3 millio ervenyes sarga taxifuvar 2025 januarjabol. A gorbe nehez farku, de lathatoan nem egyetlen tiszta hatvanytorveny.",
  },
  "earthquakes-usgs-2025": {
    hook: "Kis foldrengesek allandoan vannak. A ritka nagy esemeny teljesen mas energiaszint.",
    detail: "Vilagszerte 2,5-os vagy nagyobb magnitudoju esemenyek 2025-ben. A relativ energia a jelentett magnitudobol szarmazik.",
  },
  "us-market-absolute-returns-french": {
    hook: "A piac nyugodtnak tunik, amig a farok meg nem mozdul.",
    detail: "Napi abszolut amerikai piaci hozamok a Kenneth French faktor idosorbol. A diagram nagysagot mutat, nem iranyt.",
  },
  "wildfires-mtbs-1984-2024": {
    hook: "A legtobb rogzitett nagy tuz a program kuszobe kozeleben marad. Nehany teljes tajakat rajzol at.",
    detail: "MTBS nagy amerikai erdotuz- es vadteruleti tuz-hatarok 1984 es 2024 kozott.",
  },
  "storm-damage-noaa-2025": {
    hook: "A kar nem egyenletesen oszlik el a viharok kozott.",
    detail: "2025-os amerikai viharesemenyek jelentett ingatlan- es termenykarai. A nulla es hianyzo karertekek kimaradnak.",
  },
  "pollution-openmeteo-nyc-2025": {
    hook: "Az eves atlag elrejtheti azokat az orakat, amikor a levego veszelyesse valik.",
    detail: "Oras New York-i PM2.5 becslesek 2025-re. A korlatozott tartomany kulonosen gyengeve teszi a log-log allitast.",
  },
  "conflict-fatalities-ucdp-ged-26-1": {
    hook: "A rogzitett eroszak koncentralt: nehany esemeny aranytalan emberveszteseget okoz.",
    detail: "UCDP esemenyszintu legjobb becslesek 1989 es 2025 kozott. A nulla halalos aldozatu rekordok kimaradnak; minden pont emberi veszteseget jelez.",
  },
  "household-net-worth-scf-2022": {
    hook: "A vagyon nem ugy oszlik el, mint a testmagassag. A felso farok tovabb nyulik.",
    detail: "Pozitiv amerikai haztartasi netto vagyon a 2022-es Survey of Consumer Finances alapjan. A farokvaloszinusegek es atlagok sulyozottak.",
  },
  "household-income-scf-2022": {
    hook: "A jovedelem egyenetlen, bar felso farka mas alaku, mint a felhalmozott vagyon.",
    detail: "Pozitiv 2022-es SCF jovedelem-megfigyelesek sulyozott farokvaloszinusegekkel.",
  },
  "household-assets-scf-2022": {
    hook: "Az eszkoztulajdonlas a pozitiv kivonatban majdnem tiz nagysagrendet fog at.",
    detail: "Pozitiv 2022-es SCF haztartasi eszkozok. A logaritmikus diagramok szuksegkeppen kizarjak a nulla es negativ ertekeket.",
  },
  "household-debt-scf-2022": {
    hook: "Az adossag is koncentralt, de nem pontosan ugy, mint a vagyon vagy az eszkozok.",
    detail: "Pozitiv 2022-es SCF haztartasi adossag sulyozott farokvaloszinusegekkel.",
  },
  "country-gdp-worldbank-2024": {
    hook: "Egy kis gazdasagi csoport viszi a globalis kibocsatas nagy reszet.",
    detail: "Orszag GDP folyo amerikai dollarban 2024-re. A Vilagbank aggregalt regioi kimaradnak.",
  },
  "firm-assets-sec-2026q1": {
    hook: "A tozsdei vallalatok eszkozei hatalmas tartomanyt fognak at, de a gorbe ellenall az egyetlen egyszeru skalanak.",
    detail: "Osszes eszkoz az SEC 2026 Q1 Financial Statement Data Set eves jellegu bejelenteseibol.",
  },
  "bank-assets-fdic": {
    hook: "A penzugyi rendszer nehany nagyon nagy intezmenyben surusodik.",
    detail: "Aktiv FDIC-biztositott intezmenyek osszes eszkoze, ezer dollarrol dollarra atszamolva.",
  },
  "debt-securities-bis-2025q4": {
    hook: "A globalis tokepiaci hitelfelvetel erosen koncentralt a kibocsato gazdasagok kozott.",
    detail: "Belfoldi rezidensek altal kibocsatott fennallo hitelpapirok 39 orszagra 2025 Q4-ben.",
  },
  "city-populations-geonames": {
    hook: "Nehany megavaros tizezernyi kisebb hely fole magasodik.",
    detail: "Nepessegertekek a GeoNames cities15000 adatbazisbol.",
  },
  "social-network-snap-facebook": {
    hook: "A legtobb csomopontnak szereny fokszama van. Kevesebb csomopont hubba valik, de itt nem tiszta hatvanytorveny szerint.",
    detail: "Csomopont-fokszam a SNAP Facebook egyesitett, iranyitatlan el-listajabol szamolva.",
  },
  "word-frequency-gutenberg-moby-dick": {
    hook: "Nehany szo hordozza egy teljes regeny nyelvet.",
    detail: "Szogyakorisagok a Project Gutenberg Moby-Dick szovegebol. Ez a klasszikus rang-gyakorisagi feltaras.",
  },
  "citations-openalex-2020-top": {
    hook: "Nehany cikk szellemi oriasa valik, mikozben a figyelem gyorsan lecseng a rangsorban.",
    detail: "Az 1000 legtobbet idezett, 2020-ban megjelent OpenAlex-munka; ez felsorangsori kivonat, nem a teljes korpusz.",
  },
  "wikipedia-pageviews-2025-12-31": {
    hook: "Millioknyi oldal letezik. Egy adott napon a figyelem nagyon keves helyre omlik.",
    detail: "A 999 legnezettebb angol Wikipedia-cikk 2025. december 31-en.",
  },
  "open-source-downloads-pypi-2025-12": {
    hook: "A modern szoftver nehany lathatatlan infrastruktura-csomagra tamaszkodik.",
    detail: "A 100 000 legtobbet letoltott PyPI csomagnev 2025 decemberben. Automatizalt forgalom is szerepelhet.",
  },
  "species-observations-gbif-2025": {
    hook: "Nehany fajt mindenhol rogzitenek. Sokan alig latszanak a megfigyelesi adatbazisban.",
    detail: "Legmagasabb GBIF tudomanyosnev-elofordulasi szamok 2025-re. A rekordok nem a valodi populacio-boseg becslesei.",
  },
  "body-size-pantheria": {
    hook: "Az emlos elet elkepesztoen kulonbozo fizikai skalakon mozog.",
    detail: "Felnott testtomeg a PanTHERIA emlos eletmenet-adatbazisbol.",
  },
  "exoplanets-nasa-orbital-periods": {
    hook: "A log skalak kozmikus valtozatossagot fednek fel akkor is, ha a minta nem tiszta hatvanytorveny.",
    detail: "Megerositett exobolygok keringesi periodusai a NASA Exoplanet Archive osszetett parameter-tablajabol.",
  },
  "us-market-shock-waiting-times-french": {
    hook: "A nyugodt idoszakok csoportosulnak. A sokkok is.",
    detail: "Kereskedesi napok szama az amerikai piacon legalabb 3%-os abszolut elmozdulasok kozott. Az intervallumok valos napi hozamokbol szarmaznak.",
  },
});

Object.assign(storiesRo, {
  "transit-headways-mbta-gtfs": {
    hook: "Un orar promite regularitate. Golurile programate dintre plecari arata deja o margine lunga.",
    detail: "Acestea sunt intervale programate MBTA la prima statie, nu sosiri observate sau timpi de asteptare ai pasagerilor.",
  },
  "flight-delays-bts-2025-01": {
    hook: "Cele mai multe intarzieri sunt suportabile. O mica parte strica intreaga zi.",
    detail: "Zboruri americane din ianuarie 2025 cu intarziere pozitiva la sosire. In vederea cozii, inaltimea arata sansa unei intarzieri cel putin atat de lungi.",
  },
  "taxi-trip-distances-nyc-tlc-2025-01": {
    hook: "New York se misca mai ales in salturi scurte, intrerupte de calatorii rare prin regiunea urbana.",
    detail: "Peste 3,3 milioane de curse valide cu taxi galben din ianuarie 2025. Curba are coada grea, dar vizibil nu este o singura lege de putere curata.",
  },
  "earthquakes-usgs-2025": {
    hook: "Cutremurele mici apar constant. Evenimentul rar are un nivel complet diferit de energie.",
    detail: "Evenimente mondiale de magnitudine 2,5 sau mai mare in 2025. Energia relativa este derivata din magnitudinea raportata.",
  },
  "us-market-absolute-returns-french": {
    hook: "Piata pare calma pana cand coada se misca.",
    detail: "Randamente zilnice absolute ale pietei SUA din seria de factori Kenneth French. Graficul descrie magnitudinea, nu directia.",
  },
  "wildfires-mtbs-1984-2024": {
    hook: "Cele mai multe incendii mari inregistrate raman langa pragul programului. Cateva redeseneaza peisaje.",
    detail: "Limite MTBS pentru incendii mari din SUA si folosire controlata a focului in salbaticie, din 1984 pana in 2024.",
  },
  "storm-damage-noaa-2025": {
    hook: "Pagubele nu sunt distribuite uniform intre furtuni.",
    detail: "Pagube raportate la proprietati si culturi pentru evenimente de furtuna din SUA in 2025. Inregistrarile cu paguba zero sau lipsa sunt excluse.",
  },
  "pollution-openmeteo-nyc-2025": {
    hook: "O medie anuala poate ascunde orele in care aerul devine periculos.",
    detail: "Estimari orare PM2.5 pentru New York City in 2025. Domeniul limitat face o afirmatie log-log mai ales neconvingatoare.",
  },
  "conflict-fatalities-ucdp-ged-26-1": {
    hook: "Violenta inregistrata este concentrata: un numar mic de evenimente explica o pierdere disproportionata de vieti.",
    detail: "Estimari UCDP la nivel de eveniment din 1989 pana in 2025. Inregistrarile fara victime sunt omise; fiecare punct reprezinta pierdere umana.",
  },
  "household-net-worth-scf-2022": {
    hook: "Averea nu se distribuie ca inaltimea sau varsta. Coada superioara continua.",
    detail: "Avere neta pozitiva a gospodariilor SUA in 2022 din Survey of Consumer Finances. Probabilitatile din coada si mediile folosesc ponderi de sondaj.",
  },
  "household-income-scf-2022": {
    hook: "Venitul este inegal, desi coada superioara are alta forma decat averea acumulata.",
    detail: "Observatii pozitive de venit SCF 2022 cu probabilitati din coada ponderate prin sondaj.",
  },
  "household-assets-scf-2022": {
    hook: "Detinerea de active se intinde pe aproape zece ordine de marime in extractul pozitiv.",
    detail: "Active pozitive ale gospodariilor SCF 2022. Graficele logaritmice exclud inevitabil valorile zero si negative.",
  },
  "household-debt-scf-2022": {
    hook: "Datoria este si ea concentrata, dar nu are exact aceeasi forma ca averea sau activele.",
    detail: "Datorie pozitiva a gospodariilor SCF 2022 cu probabilitati din coada ponderate prin sondaj.",
  },
  "country-gdp-worldbank-2024": {
    hook: "Un grup mic de economii poarta mare parte din productia globala.",
    detail: "PIB pe tari in dolari SUA curenti pentru 2024. Regiunile agregate ale Bancii Mondiale sunt excluse.",
  },
  "firm-assets-sec-2026q1": {
    hook: "Activele companiilor publice acopera un interval urias, dar curba refuza o singura poveste de scala.",
    detail: "Active totale din raportari de tip anual in SEC 2026 Q1 Financial Statement Data Set.",
  },
  "bank-assets-fdic": {
    hook: "Sistemul financiar se concentreaza in cateva institutii foarte mari.",
    detail: "Active totale pentru institutii FDIC active si asigurate, convertite din mii de dolari in dolari.",
  },
  "debt-securities-bis-2025q4": {
    hook: "Imprumuturile pe pietele globale de capital sunt foarte concentrate intre economiile emitente.",
    detail: "Titluri de datorie restante emise de rezidenti pentru 39 de tari in 2025 Q4.",
  },
  "city-populations-geonames": {
    hook: "Cateva megaorase domina zeci de mii de locuri mai mici.",
    detail: "Valori de populatie din baza de date GeoNames cities15000.",
  },
  "social-network-snap-facebook": {
    hook: "Cele mai multe noduri au grad modest. Un numar mai mic devine hub, dar aici nu dupa o lege de putere curata.",
    detail: "Gradul nodului calculat din lista de muchii nedirectionate SNAP Facebook combined.",
  },
  "word-frequency-gutenberg-moby-dick": {
    hook: "Cateva cuvinte poarta limba unui intreg roman.",
    detail: "Numarari de cuvinte din editia text Project Gutenberg a romanului Moby-Dick. Este revelatia clasica rang-frecventa.",
  },
  "citations-openalex-2020-top": {
    hook: "Cateva lucrari devin giganti intelectuali, in timp ce atentia scade rapid pe rang.",
    detail: "Cele 1.000 de lucrari OpenAlex cele mai citate, publicate in 2020; este un extract din varful clasamentului, nu intregul corpus.",
  },
  "wikipedia-pageviews-2025-12-31": {
    hook: "Exista milioane de pagini. Intr-o zi data, atentia se revarsa intr-un numar foarte mic.",
    detail: "Top 999 articole Wikipedia in engleza dupa vizualizari la 31 decembrie 2025.",
  },
  "open-source-downloads-pypi-2025-12": {
    hook: "Software-ul modern se sprijina pe un set mic de pachete de infrastructura invizibile.",
    detail: "Primele 100.000 de nume de pachete PyPI dupa descarcari in decembrie 2025. Traficul automat poate fi inclus.",
  },
  "species-observations-gbif-2025": {
    hook: "Unele specii sunt inregistrate peste tot. Multe raman aproape invizibile in baza de observatii.",
    detail: "Cele mai mari numere de aparitii GBIF dupa nume stiintific pentru 2025. Inregistrarile nu sunt estimari ale abundentei reale.",
  },
  "body-size-pantheria": {
    hook: "Viata mamiferelor ocupa scale fizice uimitor de diferite.",
    detail: "Masa corporala adulta din baza PanTHERIA despre istoria vietii mamiferelor.",
  },
  "exoplanets-nasa-orbital-periods": {
    hook: "Scalele log dezvaluie varietate cosmica chiar si cand modelul nu este o lege de putere pura.",
    detail: "Perioade orbitale ale exoplanetelor confirmate din tabelul de parametri compusi NASA Exoplanet Archive.",
  },
  "us-market-shock-waiting-times-french": {
    hook: "Perioadele calme se grupeaza. Si socurile se grupeaza.",
    detail: "Intervale in zile de tranzactionare intre miscari ale pietei SUA cu randament absolut de cel putin 3%. Intervalele sunt derivate din randamente zilnice reale.",
  },
});

export const translations = {
  en: {
    languageName: "English",
    nav: {
      brand: "The Scale Button",
      story: "Story",
      button: "The button",
      chapters: "Chapters",
      atlas: "Atlas",
      compare: "Compare",
      sources: "Sources",
      caution: "Where scales fail",
      open: "Open",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      skip: "Skip to the story",
      language: "Language",
      theme: "Switch color theme",
    },
    loading: {
      title: "Loading 27 Convex-backed datasets",
      detail: "Preparing rank curves, tails, and source notes.",
    },
    hero: {
      eyebrow: "Interactive data essay / Convex-backed data",
      title: "The Scale Button",
      thesis: "Same data. Different scale. Different world.",
      subtitle: "Why averages fail in a world of extremes.",
      datasets: "datasets",
      datasetsDetail: "Real-world systems",
      scaleViews: "scale views",
      scaleViewsDetail: "See the full picture",
      sourceObservations: "source observations",
      chapters: "chapters",
      cta: "Begin the experiment",
      modePickerLabel: "Choose the transformed right side of the hero chart",
    },
    opening: {
      kicker: "The comfortable answer",
      title: "The average sounds reassuring.",
      lines: [
        "The average market day is calm.",
        "The average flight delay is manageable.",
        "The average city is not very large.",
      ],
      reveal: "But nobody experiences only the average.",
      revealStrong: "We experience the tail.",
    },
    machine: {
      index: "01 / The instrument",
      title: "One button. Four ways to see.",
      body: "The chart is not changing its data. It is changing what your eye is allowed to notice.",
      visualStraightness: "Visual straightness",
      noDataset: "No dataset loaded.",
    },
    feature: {
      label: "Flagship dataset",
      meaningPrefix: "Meaning",
      score: "Score",
      evidence: "Open the evidence",
      observations: "Observations",
      maximum: "Maximum",
      mean: "Mean",
      ordersOfRange: "Orders of range",
      largestObservations: "Largest observations",
    },
    atlas: {
      index: "08 / Scope without overload",
      title: "The Scale Atlas",
      body: "The project contains 27 systems. Browse them by chapter, then use the same scale button to compare shape without losing the story.",
      all: "All",
      datasetsInView: "datasets in view",
      datasetsInChapter: "datasets in this chapter",
      visualStraightness: "visual straightness",
      filterLabel: "Filter datasets by chapter",
    },
    comparison: {
      index: "09 / All systems",
      title: "The comparison wall",
      body: "Every system in the same frame. The straightness score measures visual linearity in the selected coordinates; it is not a formal power-law test.",
      showingPrefix: "Showing",
    },
    caution: {
      index: "10 / The necessary warning",
      title: "The button is a lens, not proof.",
      body: "Logarithms reveal range. They do not manufacture a law. These real examples stay curved, stepped, or structurally mixed when their axes change.",
      readCarefully: "Read this carefully",
      note: "A high straightness score can be a clue, never a verdict. Truncation, mixtures, measurement rules, discrete values, and finite samples can all make a line look persuasive. Formal power-law analysis needs model fitting and comparison against alternatives.",
    },
    sources: {
      index: "11 / Provenance",
      title: "Real data. Visible receipts.",
      body: "Every chart is backed by public source metadata imported into Convex with the chart points.",
      dataAndCitations: "Data and citations",
    },
    closing: {
      kicker: "The result",
      title: "The world is not average.",
      copy: "It is uneven, clustered, bursty, and extreme.",
      sequence: {
        linear: "shows the giants.",
        log: "reveals the hidden middle.",
        loglog: "exposes possible structure.",
        tail: "shows what we should not ignore.",
      },
      finalA: "The data did not change.",
      finalB: "The scale did.",
      restart: "Run the experiment again",
    },
    footer: {
      built: "Built from public data imported into Convex.",
    },
    chart: {
      linearSide: "Linear",
      transformedSide: "Transformed",
      frequency: "Frequency",
      rank: "Rank",
      value: "Value",
      rawRank: "Rank",
      logRank: "Rank, log scale",
      logValue: "log scale",
      tailThreshold: "threshold, log scale",
      tailProbability: "Probability at least this large, log scale",
      atLeast: "At least",
    },
    scaleModes: {
      linear: {
        label: "Linear",
        shortLabel: "Linear",
        question: "What dominates?",
        summary: "Raw rank and raw value",
      },
      log: {
        label: "Log Y",
        shortLabel: "Log",
        question: "What was hidden?",
        summary: "Raw rank and logarithmic value",
      },
      loglog: {
        label: "Log-log",
        shortLabel: "Log-log",
        question: "Is there scale structure?",
        summary: "Logarithmic rank and value",
      },
      tail: {
        label: "Tail",
        shortLabel: "Tail",
        question: "How often do extremes happen?",
        summary: "Logarithmic value and tail probability",
      },
    },
    chapters: {
      everyday: {
        title: "Everyday extremes",
        intro: "Schedules and averages describe a system. Delays, gaps, and long trips describe what a person actually encounters.",
      },
      risk: {
        title: "Risk has a tail",
        intro: "Most days are ordinary. Risk lives in the small share of observations that are not, where damage and consequence accumulate quickly.",
      },
      inequality: {
        title: "Inequality has a shape",
        intro: "Wealth, output, institutions, and cities do not simply differ. They occupy ranges so wide that the middle disappears on ordinary axes.",
      },
      attention: {
        title: "Attention has a tail",
        intro: "Language, research, knowledge, and software all distribute attention unevenly. A small number of names carry astonishing weight.",
      },
      life: {
        title: "Life and the universe on log scales",
        intro: "Logarithms are useful beyond power laws. They let organisms and planets separated by many orders of magnitude remain visible together.",
      },
      time: {
        title: "Time has a tail",
        intro: "Extremes are not only large things. They are also the uneven intervals between events: short bursts, long silences, then sudden movement.",
      },
    },
    stories: storiesEn,
    cautions: {
      "exoplanets-nasa-orbital-periods": {
        badge: "Log scale helps",
        text: "Planet periods span wild ranges, but the curve stays mixed. Useful visibility is not the same as a power law.",
      },
      "pollution-openmeteo-nyc-2025": {
        badge: "Range is limited",
        text: "PM2.5 spikes are important, yet this extract spans too little range for a clean scale-free reading.",
      },
      "taxi-trip-distances-nyc-tlc-2025-01": {
        badge: "Mixtures matter",
        text: "Local trips, airport trips, and unusual long journeys bend the curve into multiple regimes.",
      },
    },
    datasetTitles: datasetTitlesEn,
    categories: {
      Attention: "Attention",
      Economy: "Economy",
      Inequality: "Inequality",
      "Life and Universe": "Life and Universe",
      Mobility: "Mobility",
      Knowledge: "Knowledge",
      Risk: "Risk",
      Society: "Society",
      Time: "Time",
    },
    units: {
      acres: "acres",
      citations: "citations",
      connections: "connections",
      days: "days",
      downloads: "downloads",
      fatalities: "fatalities",
      grams: "grams",
      "micrograms per cubic meter": "micrograms per cubic meter",
      miles: "miles",
      minutes: "minutes",
      "occurrence records": "occurrence records",
      occurrences: "occurrences",
      people: "people",
      percent: "percent",
      "trading days": "trading days",
      "US dollars": "US dollars",
      "2022 US dollars": "2022 US dollars",
      views: "views",
      "10^(1.5 * magnitude)": "relative energy",
    },
  },
  hu: {
    languageName: "Magyar",
    nav: {
      brand: "A Skala Gomb",
      story: "Tortenet",
      button: "A gomb",
      chapters: "Fejezetek",
      atlas: "Atlasz",
      compare: "Osszevetes",
      sources: "Forrasok",
      caution: "Ahol a skala felrevezet",
      open: "Nyitas",
      openNavigation: "Navigacio megnyitasa",
      closeNavigation: "Navigacio bezarasa",
      skip: "Ugras a tortenethez",
      language: "Nyelv",
      theme: "Szintema valtasa",
    },
    loading: {
      title: "27 Convex-adatkeszlet betoltese",
      detail: "Ranggorbek, faroknezetek es forrasjegyzetek elokeszitese.",
    },
    hero: {
      eyebrow: "Interaktiv adatessze / Convex-adatok",
      title: "A Skala Gomb",
      thesis: "Ugyanaz az adat. Mas skala. Mas vilag.",
      subtitle: "Miert keves az atlag egy szelsoseges vilagban.",
      datasets: "adatkeszlet",
      datasetsDetail: "Valos rendszerek",
      scaleViews: "skala-nezet",
      scaleViewsDetail: "Lasd a teljes kepet",
      sourceObservations: "forrasmegfigyeles",
      chapters: "fejezet",
      cta: "Kezdjuk a kiserletet",
      modePickerLabel: "Valaszd ki a hosdiagram jobb oldali transzformalt nezetet",
    },
    opening: {
      kicker: "A kenyelmes valasz",
      title: "Az atlag megnyugtatonak tunik.",
      lines: [
        "Egy atlagos piaci nap nyugodt.",
        "Egy atlagos repulesi keses kezelheto.",
        "Egy atlagos varos nem kulonosen nagy.",
      ],
      reveal: "De senki sem csak az atlagot eli meg.",
      revealStrong: "A farokkal talalkozunk.",
    },
    machine: {
      index: "01 / Az eszkoz",
      title: "Egy gomb. Negy lathato vilag.",
      body: "A diagram nem az adatot valtoztatja meg. Azt valtoztatja, mit enged eszrevenni a szemednek.",
      visualStraightness: "Vizualis egyenesseg",
      noDataset: "Nincs betoltott adatkeszlet.",
    },
    feature: {
      label: "Kiemelt adatkeszlet",
      meaningPrefix: "Jelentes",
      score: "Pontszam",
      evidence: "Bizonyitek megnyitasa",
      observations: "Megfigyelesek",
      maximum: "Maximum",
      mean: "Atlag",
      ordersOfRange: "Nagysagrendi tartomany",
      largestObservations: "Legnagyobb megfigyelesek",
    },
    atlas: {
      index: "08 / Terjedelem tulterheles nelkul",
      title: "A Skala Atlasz",
      body: "A projekt 27 rendszert tartalmaz. Bongessz fejezetenkent, majd ugyanazzal a skalagombbal hasonlitsd ossze az alakjukat.",
      all: "Mind",
      datasetsInView: "adatkeszlet latszik",
      datasetsInChapter: "adatkeszlet ebben a fejezetben",
      visualStraightness: "vizualis egyenesseg",
      filterLabel: "Adatkeszletek szurese fejezet szerint",
    },
    comparison: {
      index: "09 / Minden rendszer",
      title: "Az osszehasonlito fal",
      body: "Minden rendszer ugyanabban a keretben. Az egyenessegi pontszam a valasztott koordinatakban mert vizualis linearitas, nem formal power-law teszt.",
      showingPrefix: "Megjelenitve",
    },
    caution: {
      index: "10 / A szukseges figyelmeztetes",
      title: "A gomb lencse, nem bizonyitek.",
      body: "A logaritmus tartomanyt fed fel. Nem gyart torvenyt. Ezek a valos peldak gorbulnek, lepcsoznek vagy keverednek, amikor tengelyt valtunk.",
      readCarefully: "Ezt olvasd el figyelmesen",
      note: "A magas egyenessegi pontszam jel lehet, soha nem itelet. Csonkolas, keveredes, meresi szabalyok, diszkret ertekek es veges mintak mind meggyozo vonalat rajzolhatnak. A formal power-law elemzes modellezest es alternativak osszeveteset igenyli.",
    },
    sources: {
      index: "11 / Eredet",
      title: "Valos adatok. Lathato forrasok.",
      body: "Minden diagramhoz nyilvanos forrasmetaadat tartozik, amely a pontokkal egyutt kerult Convexbe.",
      dataAndCitations: "Adatok es hivatkozasok",
    },
    closing: {
      kicker: "Az eredmeny",
      title: "A vilag nem atlagos.",
      copy: "Egyenetlen, csoportosulo, robbanekony es szelsoseges.",
      sequence: {
        linear: "megmutatja az oriasokat.",
        log: "feltarja a rejtett kozepet.",
        loglog: "lathatova teszi a lehetseges szerkezetet.",
        tail: "megmutatja, mit nem hagyhatunk figyelmen kivul.",
      },
      finalA: "Az adat nem valtozott.",
      finalB: "A skala valtozott.",
      restart: "Futtasd ujra a kiserletet",
    },
    footer: {
      built: "Nyilvanos adatokbol epitve, Convexbe importalva.",
    },
    chart: {
      linearSide: "Linearis",
      transformedSide: "Transzformalt",
      frequency: "Gyakorisag",
      rank: "Rang",
      value: "Ertek",
      rawRank: "Rang",
      logRank: "Rang, log skala",
      logValue: "log skala",
      tailThreshold: "kuszob, log skala",
      tailProbability: "Legalabb ekkora valoszinuseg, log skala",
      atLeast: "Legalabb",
    },
    scaleModes: {
      linear: {
        label: "Linearis",
        shortLabel: "Linearis",
        question: "Mi uralja a kepet?",
        summary: "Nyers rang es nyers ertek",
      },
      log: {
        label: "Log Y",
        shortLabel: "Log",
        question: "Mi volt elrejtve?",
        summary: "Nyers rang es logaritmikus ertek",
      },
      loglog: {
        label: "Log-log",
        shortLabel: "Log-log",
        question: "Van skala-szerkezet?",
        summary: "Logaritmikus rang es ertek",
      },
      tail: {
        label: "Farok",
        shortLabel: "Farok",
        question: "Milyen gyakori a szelsoseg?",
        summary: "Logaritmikus ertek es farokvaloszinuseg",
      },
    },
    chapters: {
      everyday: {
        title: "Mindennapi szelsosegek",
        intro: "A menetrendek es atlagok rendszert irnak le. A kesesek, resek es hosszu utak azt, amit az ember valoban megtapasztal.",
      },
      risk: {
        title: "A kockazatnak farka van",
        intro: "A legtobb nap hetkoznapi. A kockazat abban a kis reszben el, ahol a kar es a kovetkezmeny gyorsan osszegyulik.",
      },
      inequality: {
        title: "Az egyenlotlensegnek alakja van",
        intro: "A vagyon, termeles, intezmenyek es varosok nem csak kulonboznek. Olyan tartomanyokat toltenek ki, ahol a kozep eltunik.",
      },
      attention: {
        title: "A figyelemnek farka van",
        intro: "Nyelv, kutatas, tudas es szoftver mind egyenetlenul osztja el a figyelmet. Keves nev elkepeszto sulyt hordoz.",
      },
      life: {
        title: "Elet es univerzum log skalan",
        intro: "A logaritmus nem csak power-law esetben hasznos. Nagysagrendekkel eltero elolenyeket es bolygokat tud egyutt lathatova tenni.",
      },
      time: {
        title: "Az idonek farka van",
        intro: "A szelsoseg nem csak nagy meret. Az esemenyek kozti egyenetlen ido is: rovid kitoresek, hosszu csendek, majd hirtelen mozgas.",
      },
    },
    stories: storiesHu,
    cautions: {
      "exoplanets-nasa-orbital-periods": {
        badge: "A log skala segit",
        text: "A bolygok keringesi ideje hatalmas tartomanyt fed le, de a gorbe kevert marad. A lathatosag nem ugyanaz, mint egy torveny.",
      },
      "pollution-openmeteo-nyc-2025": {
        badge: "Korlatozott tartomany",
        text: "A PM2.5 kiugrasok fontosak, de ez a kivonat tul kis tartomanyt fed le egy tiszta skalaolvasathoz.",
      },
      "taxi-trip-distances-nyc-tlc-2025-01": {
        badge: "A keveredes szamit",
        text: "Helyi utak, repteri utak es ritka hosszu utazasok tobb rezsimre hajlitjak a gorbet.",
      },
    },
    datasetTitles: datasetTitlesHu,
    categories: {
      Attention: "Figyelem",
      Economy: "Gazdasag",
      Inequality: "Egyenlotlenseg",
      "Life and Universe": "Elet es univerzum",
      Mobility: "Mobilitas",
      Knowledge: "Tudas",
      Risk: "Kockazat",
      Society: "Tarsadalom",
      Time: "Ido",
    },
    units: {
      acres: "acre",
      citations: "hivatkozas",
      connections: "kapcsolat",
      days: "nap",
      downloads: "letoltes",
      fatalities: "halalos aldozat",
      grams: "gramm",
      "micrograms per cubic meter": "mikrogramm/kobmeter",
      miles: "merfold",
      minutes: "perc",
      "occurrence records": "elofordulasi rekord",
      occurrences: "elofordulas",
      people: "fo",
      percent: "szazalek",
      "trading days": "kereskedesi nap",
      "US dollars": "USA-dollar",
      "2022 US dollars": "2022-es USA-dollar",
      views: "megtekintes",
      "10^(1.5 * magnitude)": "relativ energia",
    },
  },
  ro: {
    languageName: "Romana",
    nav: {
      brand: "Butonul de Scala",
      story: "Poveste",
      button: "Butonul",
      chapters: "Capitole",
      atlas: "Atlas",
      compare: "Compara",
      sources: "Surse",
      caution: "Unde scala esueaza",
      open: "Deschide",
      openNavigation: "Deschide navigarea",
      closeNavigation: "Inchide navigarea",
      skip: "Sari la poveste",
      language: "Limba",
      theme: "Schimba tema de culoare",
    },
    loading: {
      title: "Se incarca 27 de seturi de date din Convex",
      detail: "Pregatim curbe de rang, cozi si note despre surse.",
    },
    hero: {
      eyebrow: "Eseu de date interactiv / date Convex",
      title: "Butonul de Scala",
      thesis: "Aceeasi data. Alta scala. Alta lume.",
      subtitle: "De ce mediile esueaza intr-o lume a extremelor.",
      datasets: "seturi de date",
      datasetsDetail: "Sisteme reale",
      scaleViews: "vederi de scala",
      scaleViewsDetail: "Vezi imaginea completa",
      sourceObservations: "observatii sursa",
      chapters: "capitole",
      cta: "Incepe experimentul",
      modePickerLabel: "Alege partea dreapta transformata a graficului erou",
    },
    opening: {
      kicker: "Raspunsul confortabil",
      title: "Media suna linistitor.",
      lines: [
        "O zi medie de piata este calma.",
        "O intarziere medie de zbor este gestionabila.",
        "Un oras mediu nu este foarte mare.",
      ],
      reveal: "Dar nimeni nu traieste doar media.",
      revealStrong: "Traim coada distributiei.",
    },
    machine: {
      index: "01 / Instrumentul",
      title: "Un buton. Patru moduri de a vedea.",
      body: "Graficul nu schimba datele. Schimba ce are voie ochiul tau sa observe.",
      visualStraightness: "Rectitudine vizuala",
      noDataset: "Nu este incarcat niciun set de date.",
    },
    feature: {
      label: "Set de date principal",
      meaningPrefix: "Sens",
      score: "Scor",
      evidence: "Deschide dovezile",
      observations: "Observatii",
      maximum: "Maxim",
      mean: "Medie",
      ordersOfRange: "Ordine de marime",
      largestObservations: "Cele mai mari observatii",
    },
    atlas: {
      index: "08 / Arie fara aglomerare",
      title: "Atlasul Scalelor",
      body: "Proiectul contine 27 de sisteme. Rasfoieste-le pe capitole, apoi foloseste acelasi buton de scala pentru a compara forma.",
      all: "Toate",
      datasetsInView: "seturi de date vizibile",
      datasetsInChapter: "seturi de date in acest capitol",
      visualStraightness: "rectitudine vizuala",
      filterLabel: "Filtreaza seturile de date dupa capitol",
    },
    comparison: {
      index: "09 / Toate sistemele",
      title: "Peretele de comparatie",
      body: "Fiecare sistem in acelasi cadru. Scorul de rectitudine masoara linearitatea vizuala in coordonatele selectate; nu este un test formal de lege de putere.",
      showingPrefix: "Se afiseaza",
    },
    caution: {
      index: "10 / Avertismentul necesar",
      title: "Butonul este o lentila, nu o dovada.",
      body: "Logaritmii dezvaluie intervale. Nu fabrica o lege. Aceste exemple reale raman curbate, in trepte sau amestecate cand axele se schimba.",
      readCarefully: "Citeste cu atentie",
      note: "Un scor mare de rectitudine poate fi un indiciu, niciodata un verdict. Trunchierea, amestecurile, regulile de masurare, valorile discrete si esantioanele finite pot face o linie sa para convingatoare. Analiza formala are nevoie de potrivire de model si comparatie cu alternative.",
    },
    sources: {
      index: "11 / Provenienta",
      title: "Date reale. Surse vizibile.",
      body: "Fiecare grafic este sustinut de metadate publice de sursa importate in Convex impreuna cu punctele.",
      dataAndCitations: "Date si citari",
    },
    closing: {
      kicker: "Rezultatul",
      title: "Lumea nu este medie.",
      copy: "Este inegala, grupata, exploziva si extrema.",
      sequence: {
        linear: "arata gigantii.",
        log: "dezvaluie mijlocul ascuns.",
        loglog: "expune o posibila structura.",
        tail: "arata ce nu trebuie ignorat.",
      },
      finalA: "Datele nu s-au schimbat.",
      finalB: "Scala s-a schimbat.",
      restart: "Ruleaza din nou experimentul",
    },
    footer: {
      built: "Construit din date publice importate in Convex.",
    },
    chart: {
      linearSide: "Liniar",
      transformedSide: "Transformat",
      frequency: "Frecventa",
      rank: "Rang",
      value: "Valoare",
      rawRank: "Rang",
      logRank: "Rang, scala log",
      logValue: "scala log",
      tailThreshold: "prag, scala log",
      tailProbability: "Probabilitate cel putin atat de mare, scala log",
      atLeast: "Cel putin",
    },
    scaleModes: {
      linear: {
        label: "Liniar",
        shortLabel: "Liniar",
        question: "Ce domina?",
        summary: "Rang brut si valoare bruta",
      },
      log: {
        label: "Log Y",
        shortLabel: "Log",
        question: "Ce era ascuns?",
        summary: "Rang brut si valoare logaritmica",
      },
      loglog: {
        label: "Log-log",
        shortLabel: "Log-log",
        question: "Exista structura de scala?",
        summary: "Rang si valoare logaritmice",
      },
      tail: {
        label: "Coada",
        shortLabel: "Coada",
        question: "Cat de des apar extremele?",
        summary: "Valoare logaritmica si probabilitate de coada",
      },
    },
    chapters: {
      everyday: {
        title: "Extreme cotidiene",
        intro: "Orarele si mediile descriu un sistem. Intarzierile, golurile si drumurile lungi descriu ce traieste o persoana.",
      },
      risk: {
        title: "Riscul are coada",
        intro: "Cele mai multe zile sunt obisnuite. Riscul traieste in mica parte de observatii in care pagubele si consecintele se acumuleaza rapid.",
      },
      inequality: {
        title: "Inegalitatea are forma",
        intro: "Averea, productia, institutiile si orasele nu doar difera. Ocupa intervale atat de largi incat mijlocul dispare pe axe obisnuite.",
      },
      attention: {
        title: "Atentia are coada",
        intro: "Limba, cercetarea, cunoasterea si software-ul distribuie atentia inegal. Cateva nume poarta o greutate uriasa.",
      },
      life: {
        title: "Viata si universul pe scale log",
        intro: "Logaritmii sunt utili dincolo de legile de putere. Fac vizibile impreuna organisme si planete separate de multe ordine de marime.",
      },
      time: {
        title: "Timpul are coada",
        intro: "Extremele nu sunt doar lucruri mari. Sunt si intervalele inegale dintre evenimente: izbucniri scurte, taceri lungi, apoi miscare brusca.",
      },
    },
    stories: storiesRo,
    cautions: {
      "exoplanets-nasa-orbital-periods": {
        badge: "Scala log ajuta",
        text: "Perioadele planetelor acopera intervale uriase, dar curba ramane amestecata. Vizibilitatea utila nu este acelasi lucru cu o lege.",
      },
      "pollution-openmeteo-nyc-2025": {
        badge: "Interval limitat",
        text: "Varfurile PM2.5 sunt importante, dar acest extras acopera un interval prea mic pentru o lectura curata fara scala.",
      },
      "taxi-trip-distances-nyc-tlc-2025-01": {
        badge: "Amestecurile conteaza",
        text: "Cursele locale, cursele spre aeroport si calatoriile lungi rare indoaie curba in mai multe regimuri.",
      },
    },
    datasetTitles: datasetTitlesRo,
    categories: {
      Attention: "Atentie",
      Economy: "Economie",
      Inequality: "Inegalitate",
      "Life and Universe": "Viata si univers",
      Mobility: "Mobilitate",
      Knowledge: "Cunoastere",
      Risk: "Risc",
      Society: "Societate",
      Time: "Timp",
    },
    units: {
      acres: "acri",
      citations: "citari",
      connections: "conexiuni",
      days: "zile",
      downloads: "descarcari",
      fatalities: "victime",
      grams: "grame",
      "micrograms per cubic meter": "micrograme pe metru cub",
      miles: "mile",
      minutes: "minute",
      "occurrence records": "inregistrari de aparitie",
      occurrences: "aparitii",
      people: "persoane",
      percent: "procent",
      "trading days": "zile de tranzactionare",
      "US dollars": "dolari SUA",
      "2022 US dollars": "dolari SUA 2022",
      views: "vizualizari",
      "10^(1.5 * magnitude)": "energie relativa",
    },
  },
} satisfies Record<Language, Translation>;

export const languageLocales: Record<Language, string> = {
  en: "en",
  hu: "hu-HU",
  ro: "ro-RO",
};
