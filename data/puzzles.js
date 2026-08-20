// Futbalová nora — puzzle data. Pure JSON literal; validated by tools/validate.mjs.
const RH_PUZZLES = {
  "version": 1,
  "epoch": "2026-08-19",
  "chains": [
    {
      "id": "wc-history-01",
      "title": { "en": "From Brazil to Zlatan", "sk": "Od Brazílie po Zlatana" },
      "questions": [
        {
          "topic": { "en": "The World Cup", "sk": "Majstrovstvá sveta" },
          "question": { "en": "Which country has won the most FIFA World Cup titles?", "sk": "Ktorá krajina vyhrala najviac titulov majstrov sveta vo futbale?" },
          "answer": {
            "display": { "en": "Brazil", "sk": "Brazília" },
            "accept": { "en": ["brazil"], "sk": ["brazilia"] }
          },
          "hint": { "en": "Their home kit is yellow with green trim.", "sk": "Ich domáce dresy sú žlté so zelenými doplnkami." },
          "distractors": { "en": ["Germany", "Argentina", "Italy"], "sk": ["Nemecko", "Argentína", "Taliansko"] }
        },
        {
          "topic": { "en": "Brazil", "sk": "Brazília" },
          "question": { "en": "Which Brazilian is the only player in history to win three World Cups?", "sk": "Ktorý Brazílčan je jediným hráčom v histórii, ktorý vyhral tri majstrovstvá sveta?" },
          "answer": {
            "display": { "en": "Pelé", "sk": "Pelé" },
            "accept": { "en": ["pele", "edson arantes do nascimento"], "sk": ["pele"] }
          },
          "hint": { "en": "He won his first as a 17-year-old in 1958.", "sk": "Prvý titul získal ako 17-ročný v roku 1958." },
          "distractors": { "en": ["Ronaldo", "Garrincha", "Cafu"], "sk": ["Ronaldo", "Garrincha", "Cafu"] }
        },
        {
          "topic": { "en": "Pelé", "sk": "Pelé" },
          "question": { "en": "Pelé spent almost his entire club career at which Brazilian club?", "sk": "Pelé strávil takmer celú klubovú kariéru v ktorom brazílskom klube?" },
          "answer": {
            "display": { "en": "Santos", "sk": "Santos" },
            "accept": { "en": ["santos", "santos fc"], "sk": ["santos"] }
          },
          "hint": { "en": "A port city club in São Paulo state.", "sk": "Klub z prístavného mesta v štáte São Paulo." },
          "distractors": { "en": ["Flamengo", "Corinthians", "São Paulo FC"], "sk": ["Flamengo", "Corinthians", "São Paulo FC"] }
        },
        {
          "topic": { "en": "Santos", "sk": "Santos" },
          "question": { "en": "Neymar started at Santos before a 2013 transfer to which Spanish club?", "sk": "Neymar začínal v Santose, odkiaľ v roku 2013 prestúpil do ktorého španielskeho klubu?" },
          "answer": {
            "display": { "en": "FC Barcelona", "sk": "FC Barcelona" },
            "accept": { "en": ["barcelona", "barca"], "sk": ["barcelona", "barca"] }
          },
          "hint": { "en": "There he formed the famous \"MSN\" trio.", "sk": "Vytvoril tam slávne trio „MSN“." },
          "distractors": { "en": ["Real Madrid", "Atlético Madrid", "Sevilla"], "sk": ["Real Madrid", "Atlético Madrid", "Sevilla"] }
        },
        {
          "topic": { "en": "FC Barcelona", "sk": "FC Barcelona" },
          "question": { "en": "Which Dutch legend coached Barcelona to their first European Cup, won at Wembley in 1992?", "sk": "Ktorá holandská legenda doviedla ako tréner Barcelonu k jej prvému Poháru európskych majstrov, vyhranému vo Wembley v roku 1992?" },
          "answer": {
            "display": { "en": "Johan Cruyff", "sk": "Johan Cruyff" },
            "accept": { "en": ["johan cruyff", "cruyff", "cruijff", "johan cruijff"], "sk": ["johan cruyff", "cruyff"] }
          },
          "hint": { "en": "A famous dribbling turn is named after him.", "sk": "Je po ňom pomenovaná slávna klička." },
          "distractors": { "en": ["Rinus Michels", "Louis van Gaal", "Frank Rijkaard"], "sk": ["Rinus Michels", "Louis van Gaal", "Frank Rijkaard"] }
        },
        {
          "topic": { "en": "Johan Cruyff", "sk": "Johan Cruyff" },
          "question": { "en": "The famous \"Cruyff Turn\" was first shown at the 1974 World Cup against which country?", "sk": "Slávna „Cruyffova klička“ sa prvýkrát predviedla na MS 1974 proti ktorej krajine?" },
          "answer": {
            "display": { "en": "Sweden", "sk": "Švédsko" },
            "accept": { "en": ["sweden"], "sk": ["svedsko"] }
          },
          "hint": { "en": "A Scandinavian country with a yellow-and-blue flag.", "sk": "Škandinávska krajina so žlto-modrou vlajkou." },
          "distractors": { "en": ["Denmark", "West Germany", "Uruguay"], "sk": ["Dánsko", "Západné Nemecko", "Uruguaj"] }
        },
        {
          "topic": { "en": "Sweden", "sk": "Švédsko" },
          "question": { "en": "Which Swedish striker scored an outrageous 30-yard bicycle kick against England in 2012?", "sk": "Ktorý švédsky útočník strelil v roku 2012 neuveriteľné nožničky z takmer 30 metrov proti Anglicku?" },
          "answer": {
            "display": { "en": "Zlatan Ibrahimović", "sk": "Zlatan Ibrahimović" },
            "accept": { "en": ["zlatan ibrahimovic", "ibrahimovic", "zlatan"], "sk": ["zlatan ibrahimovic", "ibrahimovic", "zlatan"] }
          },
          "hint": { "en": "He famously refers to himself in the third person.", "sk": "Preslávil sa tým, že o sebe hovorí v tretej osobe." },
          "distractors": { "en": ["Henrik Larsson", "Freddie Ljungberg", "Marcus Berg"], "sk": ["Henrik Larsson", "Freddie Ljungberg", "Marcus Berg"] }
        }
      ]
    },
    {
      "id": "ucl-legends-01",
      "title": { "en": "Champions League tunnel", "sk": "Tunelom Ligy majstrov" },
      "questions": [
        {
          "topic": { "en": "The Champions League", "sk": "Liga majstrov" },
          "question": { "en": "Which club has won the most European Cup / Champions League titles?", "sk": "Ktorý klub vyhral najviac titulov v Pohári európskych majstrov / Lige majstrov?" },
          "answer": {
            "display": { "en": "Real Madrid", "sk": "Real Madrid" },
            "accept": { "en": ["real madrid", "real"], "sk": ["real madrid", "real"] }
          },
          "hint": { "en": "The all-white kings of Spain's capital.", "sk": "Biely balet zo španielskeho hlavného mesta." },
          "distractors": { "en": ["AC Milan", "Bayern Munich", "Liverpool"], "sk": ["AC Miláno", "Bayern Mníchov", "Liverpool"] }
        },
        {
          "topic": { "en": "Real Madrid", "sk": "Real Madrid" },
          "question": { "en": "Which forward, a Real Madrid great, is the all-time top scorer of the Champions League?", "sk": "Ktorý útočník, legenda Realu Madrid, je historicky najlepším strelcom Ligy majstrov?" },
          "answer": {
            "display": { "en": "Cristiano Ronaldo", "sk": "Cristiano Ronaldo" },
            "accept": { "en": ["cristiano ronaldo", "ronaldo", "cristiano", "cr7"], "sk": ["cristiano ronaldo", "ronaldo", "cristiano", "cr7"] }
          },
          "hint": { "en": "Portuguese, famous for shouting \"Siu!\" after goals.", "sk": "Portugalčan, známy gólovou oslavou „Siu!“." },
          "distractors": { "en": ["Lionel Messi", "Karim Benzema", "Raúl"], "sk": ["Lionel Messi", "Karim Benzema", "Raúl"] }
        },
        {
          "topic": { "en": "Cristiano Ronaldo", "sk": "Cristiano Ronaldo" },
          "question": { "en": "Cristiano Ronaldo won his first Champions League in 2008 with which English club?", "sk": "Cristiano Ronaldo vyhral svoju prvú Ligu majstrov v roku 2008 s ktorým anglickým klubom?" },
          "answer": {
            "display": { "en": "Manchester United", "sk": "Manchester United" },
            "accept": { "en": ["manchester united", "man united", "man utd", "united"], "sk": ["manchester united", "man united", "man utd", "united"] }
          },
          "hint": { "en": "The Red Devils of Old Trafford.", "sk": "Červení diabli z Old Traffordu." },
          "distractors": { "en": ["Chelsea", "Arsenal", "Manchester City"], "sk": ["Chelsea", "Arsenal", "Manchester City"] }
        },
        {
          "topic": { "en": "Manchester United", "sk": "Manchester United" },
          "question": { "en": "Who scored Manchester United's stoppage-time winner in the dramatic 1999 Champions League final?", "sk": "Kto strelil víťazný gól Manchestru United v nadstavenom čase dramatického finále Ligy majstrov 1999?" },
          "answer": {
            "display": { "en": "Ole Gunnar Solskjær", "sk": "Ole Gunnar Solskjær" },
            "accept": { "en": ["ole gunnar solskjaer", "solskjaer", "ole gunnar solskjar"], "sk": ["ole gunnar solskjaer", "solskjaer"] }
          },
          "hint": { "en": "The \"baby-faced assassin\" who later managed the club.", "sk": "„Zabijak s detskou tvárou“, ktorý klub neskôr aj trénoval." },
          "distractors": { "en": ["Teddy Sheringham", "Dwight Yorke", "Andy Cole"], "sk": ["Teddy Sheringham", "Dwight Yorke", "Andy Cole"] }
        },
        {
          "topic": { "en": "Ole Gunnar Solskjær", "sk": "Ole Gunnar Solskjær" },
          "question": { "en": "As a manager, Solskjær first made his name winning league titles with which Norwegian club?", "sk": "Ako tréner sa Solskjær najprv preslávil ziskom ligových titulov s ktorým nórskym klubom?" },
          "answer": {
            "display": { "en": "Molde", "sk": "Molde" },
            "accept": { "en": ["molde", "molde fk"], "sk": ["molde"] }
          },
          "hint": { "en": "A club from a small fjord town, also his hometown region.", "sk": "Klub z malého mesta pri fjorde, odkiaľ sám pochádza." },
          "distractors": { "en": ["Rosenborg", "Brann", "Vålerenga"], "sk": ["Rosenborg", "Brann", "Vålerenga"] }
        },
        {
          "topic": { "en": "Molde", "sk": "Molde" },
          "question": { "en": "Erling Haaland played for Molde under Solskjær before joining which Austrian club in 2019?", "sk": "Erling Haaland hral za Molde pod Solskjærom a v roku 2019 prestúpil do ktorého rakúskeho klubu?" },
          "answer": {
            "display": { "en": "Red Bull Salzburg", "sk": "Red Bull Salzburg" },
            "accept": { "en": ["red bull salzburg", "salzburg", "rb salzburg"], "sk": ["red bull salzburg", "salzburg", "rb salzburg"] }
          },
          "hint": { "en": "The club shares a sponsor with an energy drink.", "sk": "Klub nesie meno energetického nápoja." },
          "distractors": { "en": ["Rapid Vienna", "Sturm Graz", "LASK"], "sk": ["Rapid Viedeň", "Sturm Graz", "LASK"] }
        },
        {
          "topic": { "en": "Red Bull Salzburg", "sk": "Red Bull Salzburg" },
          "question": { "en": "Sadio Mané left Salzburg in 2014 for which English south-coast club, before later starring for Liverpool?", "sk": "Sadio Mané odišiel zo Salzburgu v roku 2014 do ktorého anglického klubu z južného pobrežia, než neskôr žiaril v Liverpoole?" },
          "answer": {
            "display": { "en": "Southampton", "sk": "Southampton" },
            "accept": { "en": ["southampton", "southampton fc"], "sk": ["southampton"] }
          },
          "hint": { "en": "Nicknamed \"The Saints\".", "sk": "Prezývajú ich „The Saints“ — Svätí." },
          "distractors": { "en": ["Brighton", "Bournemouth", "Portsmouth"], "sk": ["Brighton", "Bournemouth", "Portsmouth"] }
        }
      ]
    },
    {
      "id": "pl-vardy-01",
      "title": { "en": "From Leicester to Klose", "sk": "Od Leicestru po Kloseho" },
      "questions": [
        {
          "topic": { "en": "The Premier League", "sk": "Premier League" },
          "question": { "en": "Which club shocked the world by winning the 2015/16 Premier League as 5000-to-1 outsiders?", "sk": "Ktorý klub šokoval svet ziskom titulu v Premier League 2015/16 ako outsider s kurzom 5000:1?" },
          "answer": {
            "display": { "en": "Leicester City", "sk": "Leicester City" },
            "accept": { "en": ["leicester city", "leicester"], "sk": ["leicester city", "leicester"] }
          },
          "hint": { "en": "The Foxes, managed by Claudio Ranieri.", "sk": "Líšky, ktoré trénoval Claudio Ranieri." },
          "distractors": { "en": ["Tottenham", "West Ham", "Everton"], "sk": ["Tottenham", "West Ham", "Everton"] }
        },
        {
          "topic": { "en": "Leicester City", "sk": "Leicester City" },
          "question": { "en": "Which Leicester striker, once a non-league player, scored in a record 11 consecutive Premier League games in 2015?", "sk": "Ktorý útočník Leicestru, kedysi hráč nižších súťaží, strelil v roku 2015 gól v rekordných 11 zápasoch Premier League za sebou?" },
          "answer": {
            "display": { "en": "Jamie Vardy", "sk": "Jamie Vardy" },
            "accept": { "en": ["jamie vardy", "vardy"], "sk": ["jamie vardy", "vardy"] }
          },
          "hint": { "en": "\"Chat s***, get banged\" is his famous quote.", "sk": "Kedysi popri futbale pracoval v továrni na ortopedické dlahy." },
          "distractors": { "en": ["Riyad Mahrez", "Shinji Okazaki", "Danny Drinkwater"], "sk": ["Riyad Mahrez", "Shinji Okazaki", "Danny Drinkwater"] }
        },
        {
          "topic": { "en": "Jamie Vardy", "sk": "Jamie Vardy" },
          "question": { "en": "Vardy broke the consecutive-scoring record of which Dutch Manchester United striker?", "sk": "Vardy prekonal rekord v skórovaní v zápasoch po sebe, ktorý dovtedy držal ktorý holandský útočník Manchestru United?" },
          "answer": {
            "display": { "en": "Ruud van Nistelrooy", "sk": "Ruud van Nistelrooy" },
            "accept": { "en": ["ruud van nistelrooy", "van nistelrooy", "nistelrooy"], "sk": ["ruud van nistelrooy", "van nistelrooy", "nistelrooy"] }
          },
          "hint": { "en": "A penalty-box poacher with a famous first name \"Ruud\".", "sk": "Kanonier pokutového územia s krstným menom Ruud." },
          "distractors": { "en": ["Dennis Bergkamp", "Robin van Persie", "Patrick Kluivert"], "sk": ["Dennis Bergkamp", "Robin van Persie", "Patrick Kluivert"] }
        },
        {
          "topic": { "en": "Ruud van Nistelrooy", "sk": "Ruud van Nistelrooy" },
          "question": { "en": "Van Nistelrooy joined Manchester United in 2001 from which Dutch club?", "sk": "Van Nistelrooy prišiel do Manchestru United v roku 2001 z ktorého holandského klubu?" },
          "answer": {
            "display": { "en": "PSV Eindhoven", "sk": "PSV Eindhoven" },
            "accept": { "en": ["psv eindhoven", "psv"], "sk": ["psv eindhoven", "psv"] }
          },
          "hint": { "en": "A club founded by the Philips electronics company.", "sk": "Klub založený elektrotechnickou firmou Philips." },
          "distractors": { "en": ["Ajax", "Feyenoord", "AZ Alkmaar"], "sk": ["Ajax", "Feyenoord", "AZ Alkmaar"] }
        },
        {
          "topic": { "en": "PSV Eindhoven", "sk": "PSV Eindhoven" },
          "question": { "en": "Which Brazilian phenomenon, \"O Fenômeno\", starred for PSV before moving to Barcelona in 1996?", "sk": "Ktorý brazílsky fenomén, „O Fenômeno“, žiaril v PSV predtým, než v roku 1996 prestúpil do Barcelony?" },
          "answer": {
            "display": { "en": "Ronaldo", "sk": "Ronaldo" },
            "accept": { "en": ["ronaldo", "ronaldo nazario", "ronaldo luis nazario de lima"], "sk": ["ronaldo", "ronaldo nazario"] }
          },
          "hint": { "en": "The original Ronaldo — not the Portuguese one.", "sk": "Ten pôvodný Ronaldo — nie ten portugalský." },
          "distractors": { "en": ["Romário", "Rivaldo", "Ronaldinho"], "sk": ["Romário", "Rivaldo", "Ronaldinho"] }
        },
        {
          "topic": { "en": "Ronaldo", "sk": "Ronaldo" },
          "question": { "en": "Ronaldo scored both goals in the 2002 World Cup final against which country?", "sk": "Ronaldo strelil oba góly vo finále MS 2002 proti ktorej krajine?" },
          "answer": {
            "display": { "en": "Germany", "sk": "Nemecko" },
            "accept": { "en": ["germany"], "sk": ["nemecko"] }
          },
          "hint": { "en": "Their goalkeeper Oliver Kahn was the tournament's best player.", "sk": "Ich brankár Oliver Kahn bol najlepším hráčom turnaja." },
          "distractors": { "en": ["Italy", "France", "Netherlands"], "sk": ["Taliansko", "Francúzsko", "Holandsko"] }
        },
        {
          "topic": { "en": "Germany", "sk": "Nemecko" },
          "question": { "en": "Which German striker is the all-time top scorer in World Cup history with 16 goals?", "sk": "Ktorý nemecký útočník je s 16 gólmi historicky najlepším strelcom majstrovstiev sveta?" },
          "answer": {
            "display": { "en": "Miroslav Klose", "sk": "Miroslav Klose" },
            "accept": { "en": ["miroslav klose", "klose"], "sk": ["miroslav klose", "klose"] }
          },
          "hint": { "en": "Born in Poland, he celebrated goals with a front flip.", "sk": "Narodil sa v Poľsku a góly oslavoval saltom." },
          "distractors": { "en": ["Gerd Müller", "Thomas Müller", "Jürgen Klinsmann"], "sk": ["Gerd Müller", "Thomas Müller", "Jürgen Klinsmann"] }
        }
      ]
    },
    {
      "id": "messi-msn-01",
      "title": { "en": "From Messi to Maldini", "sk": "Od Messiho po Maldiniho" },
      "questions": [
        {
          "topic": { "en": "The 2022 World Cup", "sk": "MS 2022" },
          "question": { "en": "Which Argentine superstar finally lifted the World Cup in Qatar in 2022?", "sk": "Ktorá argentínska superhviezda konečne zdvihla trofej majstrov sveta v Katare 2022?" },
          "answer": {
            "display": { "en": "Lionel Messi", "sk": "Lionel Messi" },
            "accept": { "en": ["lionel messi", "messi", "leo messi"], "sk": ["lionel messi", "messi", "leo messi"] }
          },
          "hint": { "en": "Nicknamed \"La Pulga\" — the Flea.", "sk": "Prezývaný „La Pulga“ — Blcha." },
          "distractors": { "en": ["Ángel Di María", "Diego Maradona", "Sergio Agüero"], "sk": ["Ángel Di María", "Diego Maradona", "Sergio Agüero"] }
        },
        {
          "topic": { "en": "Lionel Messi", "sk": "Lionel Messi" },
          "question": { "en": "In 2021 Messi tearfully left Barcelona to join which French club?", "sk": "V roku 2021 Messi so slzami opustil Barcelonu a zamieril do ktorého francúzskeho klubu?" },
          "answer": {
            "display": { "en": "Paris Saint-Germain", "sk": "Paríž Saint-Germain" },
            "accept": { "en": ["paris saint germain", "psg", "paris sg", "paris saintgermain"], "sk": ["paris saint germain", "psg", "pariz saint germain"] }
          },
          "hint": { "en": "The club plays at the Parc des Princes.", "sk": "Klub hráva na štadióne Parc des Princes." },
          "distractors": { "en": ["Olympique Marseille", "AS Monaco", "Olympique Lyon"], "sk": ["Olympique Marseille", "AS Monaco", "Olympique Lyon"] }
        },
        {
          "topic": { "en": "Paris Saint-Germain", "sk": "Paríž Saint-Germain" },
          "question": { "en": "In 2017 PSG signed which Brazilian for a world-record €222 million?", "sk": "V roku 2017 PSG kúpil ktorého Brazílčana za svetový rekord 222 miliónov eur?" },
          "answer": {
            "display": { "en": "Neymar", "sk": "Neymar" },
            "accept": { "en": ["neymar", "neymar jr", "neymar junior"], "sk": ["neymar", "neymar jr"] }
          },
          "hint": { "en": "He came from Barcelona, where he wore No. 11.", "sk": "Prišiel z Barcelony, kde nosil číslo 11." },
          "distractors": { "en": ["Kylian Mbappé", "Edinson Cavani", "Ángel Di María"], "sk": ["Kylian Mbappé", "Edinson Cavani", "Ángel Di María"] }
        },
        {
          "topic": { "en": "Neymar", "sk": "Neymar" },
          "question": { "en": "At Barcelona, Neymar formed the \"MSN\" trio with Messi and which Uruguayan striker?", "sk": "V Barcelone tvoril Neymar trio „MSN“ s Messim a ktorým uruguajským útočníkom?" },
          "answer": {
            "display": { "en": "Luis Suárez", "sk": "Luis Suárez" },
            "accept": { "en": ["luis suarez", "suarez"], "sk": ["luis suarez", "suarez"] }
          },
          "hint": { "en": "Infamous for a biting incident at the 2014 World Cup.", "sk": "Neslávne známy uhryznutím súpera na MS 2014." },
          "distractors": { "en": ["Edinson Cavani", "Diego Forlán", "Darwin Núñez"], "sk": ["Edinson Cavani", "Diego Forlán", "Darwin Núñez"] }
        },
        {
          "topic": { "en": "Luis Suárez", "sk": "Luis Suárez" },
          "question": { "en": "Suárez joined Barcelona in 2014 from which English club?", "sk": "Suárez prišiel do Barcelony v roku 2014 z ktorého anglického klubu?" },
          "answer": {
            "display": { "en": "Liverpool", "sk": "Liverpool" },
            "accept": { "en": ["liverpool", "liverpool fc"], "sk": ["liverpool"] }
          },
          "hint": { "en": "The club anthem is \"You'll Never Walk Alone\".", "sk": "Klubová hymna je „You'll Never Walk Alone“." },
          "distractors": { "en": ["Arsenal", "Chelsea", "Manchester City"], "sk": ["Arsenal", "Chelsea", "Manchester City"] }
        },
        {
          "topic": { "en": "Liverpool", "sk": "Liverpool" },
          "question": { "en": "In the \"Miracle of Istanbul\" 2005 final, Liverpool came back from 3–0 down against which Italian club?", "sk": "V „zázraku z Istanbulu“, finále 2005, Liverpool otočil z 0:3 proti ktorému talianskemu klubu?" },
          "answer": {
            "display": { "en": "AC Milan", "sk": "AC Miláno" },
            "accept": { "en": ["milan", "milano"], "sk": ["milan", "milano"] }
          },
          "hint": { "en": "The Rossoneri — red and black stripes.", "sk": "Rossoneri — červeno-čierne pruhy." },
          "distractors": { "en": ["Juventus", "Inter Milan", "AS Roma"], "sk": ["Juventus", "Inter Miláno", "AS Rím"] }
        },
        {
          "topic": { "en": "AC Milan", "sk": "AC Miláno" },
          "question": { "en": "Which one-club Milan defender captained the Rossoneri, won five European Cups and played over 900 matches?", "sk": "Ktorý obranca-verný jednému klubu bol kapitánom Milána, vyhral päť európskych pohárov a odohral vyše 900 zápasov?" },
          "answer": {
            "display": { "en": "Paolo Maldini", "sk": "Paolo Maldini" },
            "accept": { "en": ["paolo maldini", "maldini"], "sk": ["paolo maldini", "maldini"] }
          },
          "hint": { "en": "His father Cesare also captained Milan to a European Cup.", "sk": "Jeho otec Cesare tiež doviedol Miláno k európskemu poháru ako kapitán." },
          "distractors": { "en": ["Franco Baresi", "Alessandro Nesta", "Alessandro Costacurta"], "sk": ["Franco Baresi", "Alessandro Nesta", "Alessandro Costacurta"] }
        }
      ]
    },
    {
      "id": "managers-01",
      "title": { "en": "The manager's dugout", "sk": "Na trénerskej lavičke" },
      "questions": [
        {
          "topic": { "en": "Legendary managers", "sk": "Legendárni tréneri" },
          "question": { "en": "Which Scottish manager led Manchester United for 26 years and won 13 Premier League titles?", "sk": "Ktorý škótsky tréner viedol Manchester United 26 rokov a vyhral 13 titulov v Premier League?" },
          "answer": {
            "display": { "en": "Sir Alex Ferguson", "sk": "Sir Alex Ferguson" },
            "accept": { "en": ["alex ferguson", "sir alex ferguson", "ferguson", "fergie"], "sk": ["alex ferguson", "sir alex ferguson", "ferguson"] }
          },
          "hint": { "en": "His late goals were known as \"Fergie time\".", "sk": "Jeho neskoré góly dostali názov „Fergie time“." },
          "distractors": { "en": ["Matt Busby", "Bill Shankly", "Kenny Dalglish"], "sk": ["Matt Busby", "Bill Shankly", "Kenny Dalglish"] }
        },
        {
          "topic": { "en": "Sir Alex Ferguson", "sk": "Sir Alex Ferguson" },
          "question": { "en": "Before United, Ferguson broke the Old Firm duopoly by winning the league with which Scottish club?", "sk": "Pred United prelomil Ferguson nadvládu Old Firmu ziskom ligového titulu s ktorým škótskym klubom?" },
          "answer": {
            "display": { "en": "Aberdeen", "sk": "Aberdeen" },
            "accept": { "en": ["aberdeen", "aberdeen fc"], "sk": ["aberdeen"] }
          },
          "hint": { "en": "A club from Scotland's north-east \"Granite City\".", "sk": "Klub zo severovýchodného „žulového mesta“ Škótska." },
          "distractors": { "en": ["Hearts", "Dundee United", "Hibernian"], "sk": ["Hearts", "Dundee United", "Hibernian"] }
        },
        {
          "topic": { "en": "Aberdeen", "sk": "Aberdeen" },
          "question": { "en": "In 1983 Ferguson's Aberdeen won the Cup Winners' Cup, beating which Spanish giant in the final?", "sk": "V roku 1983 vyhral Fergusonov Aberdeen Pohár víťazov pohárov, keď vo finále zdolal ktorého španielskeho giganta?" },
          "answer": {
            "display": { "en": "Real Madrid", "sk": "Real Madrid" },
            "accept": { "en": ["real madrid", "real"], "sk": ["real madrid", "real"] }
          },
          "hint": { "en": "The club known as \"Los Blancos\".", "sk": "Klub známy ako „Los Blancos“." },
          "distractors": { "en": ["FC Barcelona", "Valencia", "Atlético Madrid"], "sk": ["FC Barcelona", "Valencia", "Atlético Madrid"] }
        },
        {
          "topic": { "en": "Real Madrid", "sk": "Real Madrid" },
          "question": { "en": "Which French manager, a former club midfielder, won three straight Champions Leagues with Real Madrid from 2016 to 2018?", "sk": "Ktorý francúzsky tréner, bývalý stredopoliar klubu, vyhral s Realom Madrid tri Ligy majstrov po sebe v rokoch 2016 až 2018?" },
          "answer": {
            "display": { "en": "Zinédine Zidane", "sk": "Zinédine Zidane" },
            "accept": { "en": ["zinedine zidane", "zidane", "zizou"], "sk": ["zinedine zidane", "zidane", "zizou"] }
          },
          "hint": { "en": "As a player he scored a famous volley in the 2002 final.", "sk": "Ako hráč strelil slávnu volej vo finále 2002." },
          "distractors": { "en": ["Carlo Ancelotti", "Didier Deschamps", "Rafael Benítez"], "sk": ["Carlo Ancelotti", "Didier Deschamps", "Rafael Benítez"] }
        },
        {
          "topic": { "en": "Zinédine Zidane", "sk": "Zinédine Zidane" },
          "question": { "en": "Zidane was sent off in the 2006 World Cup final for headbutting which Italian defender?", "sk": "Zidane bol vo finále MS 2006 vylúčený za úder hlavou do ktorého talianskeho obrancu?" },
          "answer": {
            "display": { "en": "Marco Materazzi", "sk": "Marco Materazzi" },
            "accept": { "en": ["marco materazzi", "materazzi"], "sk": ["marco materazzi", "materazzi"] }
          },
          "hint": { "en": "The same player had earlier equalised with a header.", "sk": "Ten istý hráč predtým vyrovnal hlavičkou." },
          "distractors": { "en": ["Fabio Cannavaro", "Gennaro Gattuso", "Alessandro Nesta"], "sk": ["Fabio Cannavaro", "Gennaro Gattuso", "Alessandro Nesta"] }
        },
        {
          "topic": { "en": "Marco Materazzi", "sk": "Marco Materazzi" },
          "question": { "en": "Materazzi won the 2010 treble at Inter under which Portuguese manager?", "sk": "Materazzi získal s Interom treble v roku 2010 pod ktorým portugalským trénerom?" },
          "answer": {
            "display": { "en": "José Mourinho", "sk": "José Mourinho" },
            "accept": { "en": ["jose mourinho", "mourinho"], "sk": ["jose mourinho", "mourinho"] }
          },
          "hint": { "en": "He once called himself \"The Special One\".", "sk": "Sám seba raz nazval „The Special One“." },
          "distractors": { "en": ["André Villas-Boas", "Fernando Santos", "Carlos Queiroz"], "sk": ["André Villas-Boas", "Fernando Santos", "Carlos Queiroz"] }
        },
        {
          "topic": { "en": "José Mourinho", "sk": "José Mourinho" },
          "question": { "en": "Mourinho won his first Champions League in 2004 with which Portuguese club?", "sk": "Mourinho vyhral svoju prvú Ligu majstrov v roku 2004 s ktorým portugalským klubom?" },
          "answer": {
            "display": { "en": "FC Porto", "sk": "FC Porto" },
            "accept": { "en": ["porto"], "sk": ["porto"] }
          },
          "hint": { "en": "The club from Portugal's second-largest city.", "sk": "Klub z druhého najväčšieho mesta Portugalska." },
          "distractors": { "en": ["Benfica", "Sporting CP", "Braga"], "sk": ["Benfica", "Sporting CP", "Braga"] }
        }
      ]
    },
    {
      "id": "slovak-01",
      "title": { "en": "Slovak & Czechoslovak football", "sk": "Slovenský a československý futbal" },
      "questions": [
        {
          "topic": { "en": "Slovakia", "sk": "Slovensko" },
          "question": { "en": "Which midfielder, long-time captain of Slovakia, is the country's record appearance holder and became a Napoli legend?", "sk": "Ktorý stredopoliar, dlhoročný kapitán Slovenska, je rekordérom v počte štartov za reprezentáciu a stal sa legendou Neapola?" },
          "answer": {
            "display": { "en": "Marek Hamšík", "sk": "Marek Hamšík" },
            "accept": { "en": ["marek hamsik", "hamsik"], "sk": ["marek hamsik", "hamsik"] }
          },
          "hint": { "en": "Famous for his mohawk haircut and the No. 17 shirt.", "sk": "Známy účesom mohawk a dresom s číslom 17." },
          "distractors": { "en": ["Martin Škrtel", "Juraj Kucka", "Miroslav Karhan"], "sk": ["Martin Škrtel", "Juraj Kucka", "Miroslav Karhan"] }
        },
        {
          "topic": { "en": "Marek Hamšík", "sk": "Marek Hamšík" },
          "question": { "en": "Hamšík became the all-time record goalscorer of which Italian club?", "sk": "Hamšík sa stal historicky najlepším strelcom ktorého talianskeho klubu?" },
          "answer": {
            "display": { "en": "Napoli", "sk": "Neapol" },
            "accept": { "en": ["napoli", "naples"], "sk": ["neapol", "napoli"] }
          },
          "hint": { "en": "The club of Diego Maradona, from a city near Vesuvius.", "sk": "Klub Diega Maradonu, z mesta pri Vezuve." },
          "distractors": { "en": ["Juventus", "AS Roma", "Lazio"], "sk": ["Juventus", "AS Rím", "Lazio"] }
        },
        {
          "topic": { "en": "Napoli", "sk": "Neapol" },
          "question": { "en": "Which Argentine genius led Napoli to their first two Serie A titles in 1987 and 1990?", "sk": "Ktorý argentínsky génius doviedol Neapol k prvým dvom titulom v Serii A v rokoch 1987 a 1990?" },
          "answer": {
            "display": { "en": "Diego Maradona", "sk": "Diego Maradona" },
            "accept": { "en": ["diego maradona", "maradona", "diego armando maradona"], "sk": ["diego maradona", "maradona"] }
          },
          "hint": { "en": "Scorer of the \"Hand of God\" goal.", "sk": "Strelec gólu „Božia ruka“." },
          "distractors": { "en": ["Gabriel Batistuta", "Hernán Crespo", "Mario Kempes"], "sk": ["Gabriel Batistuta", "Hernán Crespo", "Mario Kempes"] }
        },
        {
          "topic": { "en": "Diego Maradona", "sk": "Diego Maradona" },
          "question": { "en": "Maradona's \"Hand of God\" and \"Goal of the Century\" came in the same 1986 quarter-final against which country?", "sk": "Maradonova „Božia ruka“ aj „gól storočia“ padli v tom istom štvrťfinále v roku 1986 proti ktorej krajine?" },
          "answer": {
            "display": { "en": "England", "sk": "Anglicko" },
            "accept": { "en": ["england"], "sk": ["anglicko"] }
          },
          "hint": { "en": "Their goalkeeper that day was Peter Shilton.", "sk": "Ich brankárom v ten deň bol Peter Shilton." },
          "distractors": { "en": ["Belgium", "West Germany", "Italy"], "sk": ["Belgicko", "Západné Nemecko", "Taliansko"] }
        },
        {
          "topic": { "en": "England", "sk": "Anglicko" },
          "question": { "en": "Slovakia stunned England-conquering Italy 3–2 at the 2010 World Cup. Which Slovak scored twice in that match?", "sk": "Slovensko na MS 2010 šokujúco zdolalo Taliansko 3:2. Ktorý Slovák v tom zápase strelil dva góly?" },
          "answer": {
            "display": { "en": "Róbert Vittek", "sk": "Róbert Vittek" },
            "accept": { "en": ["robert vittek", "vittek"], "sk": ["robert vittek", "vittek"] }
          },
          "hint": { "en": "He finished that World Cup with four goals in total.", "sk": "Na tých majstrovstvách nastrieľal celkovo štyri góly." },
          "distractors": { "en": ["Kamil Kopúnek", "Marek Hamšík", "Stanislav Šesták"], "sk": ["Kamil Kopúnek", "Marek Hamšík", "Stanislav Šesták"] }
        },
        {
          "topic": { "en": "Róbert Vittek", "sk": "Róbert Vittek" },
          "question": { "en": "Vittek came through the academy of which Bratislava club, Slovakia's most successful?", "sk": "Vittek vyrastal v akadémii ktorého bratislavského klubu, najúspešnejšieho na Slovensku?" },
          "answer": {
            "display": { "en": "Slovan Bratislava", "sk": "Slovan Bratislava" },
            "accept": { "en": ["slovan bratislava", "slovan"], "sk": ["slovan bratislava", "slovan"] }
          },
          "hint": { "en": "The only Czechoslovak club to win a European trophy.", "sk": "Jediný československý klub, ktorý vyhral európsku trofej." },
          "distractors": { "en": ["Spartak Trnava", "MŠK Žilina", "Inter Bratislava"], "sk": ["Spartak Trnava", "MŠK Žilina", "Inter Bratislava"] }
        },
        {
          "topic": { "en": "Slovan Bratislava", "sk": "Slovan Bratislava" },
          "question": { "en": "Which European trophy did Slovan Bratislava win in 1969, beating Barcelona in the final?", "sk": "Ktorú európsku trofej vyhral Slovan Bratislava v roku 1969, keď vo finále zdolal Barcelonu?" },
          "answer": {
            "display": { "en": "The Cup Winners' Cup", "sk": "Pohár víťazov pohárov" },
            "accept": { "en": ["cup winners cup", "european cup winners cup", "pvp"], "sk": ["pohar vitazov poharov", "pvp"] }
          },
          "hint": { "en": "A competition for domestic cup winners, discontinued in 1999.", "sk": "Súťaž pre víťazov domácich pohárov, zrušená v roku 1999." },
          "distractors": { "en": ["The European Cup", "The UEFA Cup", "The Intertoto Cup"], "sk": ["Pohár európskych majstrov", "Pohár UEFA", "Intertoto Cup"] }
        }
      ]
    },
    {
      "id": "national-teams-01",
      "title": { "en": "Great national sides", "sk": "Veľké reprezentácie" },
      "questions": [
        {
          "topic": { "en": "Total Football", "sk": "Totálny futbal" },
          "question": { "en": "Which country played \"Total Football\" and lost the 1974 and 1978 World Cup finals?", "sk": "Ktorá krajina hrala „totálny futbal“ a prehrala finále MS v rokoch 1974 aj 1978?" },
          "answer": {
            "display": { "en": "The Netherlands", "sk": "Holandsko" },
            "accept": { "en": ["netherlands", "holland"], "sk": ["holandsko", "nizozemsko"] }
          },
          "hint": { "en": "They play in bright orange.", "sk": "Hrávajú v jasne oranžovom." },
          "distractors": { "en": ["Hungary", "Belgium", "Portugal"], "sk": ["Maďarsko", "Belgicko", "Portugalsko"] }
        },
        {
          "topic": { "en": "The Netherlands", "sk": "Holandsko" },
          "question": { "en": "The Dutch won their only major trophy at Euro 1988, beating the USSR with a stunning volley by which striker?", "sk": "Holanďania získali svoju jedinú veľkú trofej na ME 1988, keď zdolali ZSSR nádhernou volejou ktorého útočníka?" },
          "answer": {
            "display": { "en": "Marco van Basten", "sk": "Marco van Basten" },
            "accept": { "en": ["marco van basten", "van basten"], "sk": ["marco van basten", "van basten"] }
          },
          "hint": { "en": "An AC Milan great whose career ended early through injury.", "sk": "Legenda AC Miláno, ktorej kariéru predčasne ukončilo zranenie." },
          "distractors": { "en": ["Ruud Gullit", "Frank Rijkaard", "Dennis Bergkamp"], "sk": ["Ruud Gullit", "Frank Rijkaard", "Dennis Bergkamp"] }
        },
        {
          "topic": { "en": "Marco van Basten", "sk": "Marco van Basten" },
          "question": { "en": "Van Basten spent his entire Dutch club career at which Amsterdam club?", "sk": "Van Basten strávil celú svoju holandskú klubovú kariéru v ktorom amsterdamskom klube?" },
          "answer": {
            "display": { "en": "Ajax", "sk": "Ajax" },
            "accept": { "en": ["ajax", "afc ajax"], "sk": ["ajax"] }
          },
          "hint": { "en": "Famous for its youth academy \"De Toekomst\".", "sk": "Známy mládežníckou akadémiou „De Toekomst“." },
          "distractors": { "en": ["PSV Eindhoven", "Feyenoord", "Utrecht"], "sk": ["PSV Eindhoven", "Feyenoord", "Utrecht"] }
        },
        {
          "topic": { "en": "Ajax", "sk": "Ajax" },
          "question": { "en": "Which Ajax-raised defender scored Barcelona's winning free kick in the 1992 European Cup final and later managed the Netherlands?", "sk": "Ktorý obranca odchovaný Ajaxom strelil víťazný priamy kop Barcelony vo finále PEM 1992 a neskôr trénoval Holandsko?" },
          "answer": {
            "display": { "en": "Ronald Koeman", "sk": "Ronald Koeman" },
            "accept": { "en": ["ronald koeman", "koeman"], "sk": ["ronald koeman", "koeman"] }
          },
          "hint": { "en": "His brother Erwin also played for the Netherlands.", "sk": "Jeho brat Erwin tiež hrával za Holandsko." },
          "distractors": { "en": ["Frank de Boer", "Danny Blind", "Jaap Stam"], "sk": ["Frank de Boer", "Danny Blind", "Jaap Stam"] }
        },
        {
          "topic": { "en": "Ronald Koeman", "sk": "Ronald Koeman" },
          "question": { "en": "Koeman won that 1992 final for Barcelona. Which Barcelona midfielder scored Spain's winning goal in the 2010 World Cup final?", "sk": "Koeman rozhodol to finále 1992 pre Barcelonu. Ktorý stredopoliar Barcelony strelil víťazný gól Španielska vo finále MS 2010?" },
          "answer": {
            "display": { "en": "Andrés Iniesta", "sk": "Andrés Iniesta" },
            "accept": { "en": ["andres iniesta", "iniesta"], "sk": ["andres iniesta", "iniesta"] }
          },
          "hint": { "en": "A Barcelona midfielder known as \"El Ilusionista\".", "sk": "Stredopoliar Barcelony prezývaný „El Ilusionista“." },
          "distractors": { "en": ["Xavi", "David Villa", "Fernando Torres"], "sk": ["Xavi", "David Villa", "Fernando Torres"] }
        },
        {
          "topic": { "en": "Andrés Iniesta", "sk": "Andrés Iniesta" },
          "question": { "en": "After his entire European career at Barcelona, Iniesta moved in 2018 to which Japanese club?", "sk": "Po celej európskej kariére v Barcelone prestúpil Iniesta v roku 2018 do ktorého japonského klubu?" },
          "answer": {
            "display": { "en": "Vissel Kobe", "sk": "Vissel Kobe" },
            "accept": { "en": ["vissel kobe", "kobe"], "sk": ["vissel kobe", "kobe"] }
          },
          "hint": { "en": "A J1 League club from a port city near Osaka.", "sk": "Klub J1 League z prístavného mesta neďaleko Osaky." },
          "distractors": { "en": ["Kashima Antlers", "Urawa Red Diamonds", "Yokohama F. Marinos"], "sk": ["Kashima Antlers", "Urawa Red Diamonds", "Yokohama F. Marinos"] }
        },
        {
          "topic": { "en": "Vissel Kobe", "sk": "Vissel Kobe" },
          "question": { "en": "Which German World Cup winner and former Arsenal forward played for Vissel Kobe from 2017?", "sk": "Ktorý nemecký majster sveta a bývalý útočník Arsenalu hral za Vissel Kobe od roku 2017?" },
          "answer": {
            "display": { "en": "Lukas Podolski", "sk": "Lukas Podolski" },
            "accept": { "en": ["lukas podolski", "podolski", "poldi"], "sk": ["lukas podolski", "podolski", "poldi"] }
          },
          "hint": { "en": "Born in Poland, famous for a thunderous left foot.", "sk": "Narodil sa v Poľsku, preslávil sa delovou ľavačkou." },
          "distractors": { "en": ["Miroslav Klose", "Mario Gómez", "Bastian Schweinsteiger"], "sk": ["Miroslav Klose", "Mario Gómez", "Bastian Schweinsteiger"] }
        }
      ]
    },
    {
      "id": "modern-stars-01",
      "title": { "en": "The modern game", "sk": "Súčasný futbal" },
      "questions": [
        {
          "topic": { "en": "The 2018 World Cup", "sk": "MS 2018" },
          "question": { "en": "Which country won the 2018 World Cup in Russia?", "sk": "Ktorá krajina vyhrala majstrovstvá sveta 2018 v Rusku?" },
          "answer": {
            "display": { "en": "France", "sk": "Francúzsko" },
            "accept": { "en": ["france"], "sk": ["francuzsko"] }
          },
          "hint": { "en": "Les Bleus, managed by Didier Deschamps.", "sk": "Les Bleus, ktorých viedol Didier Deschamps." },
          "distractors": { "en": ["Croatia", "Belgium", "England"], "sk": ["Chorvátsko", "Belgicko", "Anglicko"] }
        },
        {
          "topic": { "en": "France", "sk": "Francúzsko" },
          "question": { "en": "Which teenager scored in the 2018 final and became the youngest Frenchman to score at a World Cup final?", "sk": "Ktorý tínedžer skóroval vo finále 2018 a stal sa najmladším Francúzom so gólom vo finále MS?" },
          "answer": {
            "display": { "en": "Kylian Mbappé", "sk": "Kylian Mbappé" },
            "accept": { "en": ["kylian mbappe", "mbappe"], "sk": ["kylian mbappe", "mbappe"] }
          },
          "hint": { "en": "He later scored a hat-trick in the 2022 final.", "sk": "Vo finále 2022 neskôr strelil hetrik." },
          "distractors": { "en": ["Antoine Griezmann", "Ousmane Dembélé", "Paul Pogba"], "sk": ["Antoine Griezmann", "Ousmane Dembélé", "Paul Pogba"] }
        },
        {
          "topic": { "en": "Kylian Mbappé", "sk": "Kylian Mbappé" },
          "question": { "en": "Mbappé burst onto the scene by winning Ligue 1 in 2017 with which principality club?", "sk": "Mbappé sa presadil ziskom titulu v Ligue 1 v roku 2017 s ktorým klubom z kniežatstva?" },
          "answer": {
            "display": { "en": "AS Monaco", "sk": "AS Monaco" },
            "accept": { "en": ["monaco"], "sk": ["monaco"] }
          },
          "hint": { "en": "The club plays at the Stade Louis II by the Mediterranean.", "sk": "Klub hráva na Stade Louis II pri Stredozemnom mori." },
          "distractors": { "en": ["Lille", "Olympique Lyon", "Nice"], "sk": ["Lille", "Olympique Lyon", "Nice"] }
        },
        {
          "topic": { "en": "AS Monaco", "sk": "AS Monaco" },
          "question": { "en": "Which Portuguese midfielder left Monaco for Manchester City in 2017 and became a Guardiola mainstay?", "sk": "Ktorý portugalský stredopoliar odišiel z Monaka do Manchestru City v roku 2017 a stal sa oporou Guardiolu?" },
          "answer": {
            "display": { "en": "Bernardo Silva", "sk": "Bernardo Silva" },
            "accept": { "en": ["bernardo silva", "bernardo"], "sk": ["bernardo silva", "bernardo"] }
          },
          "hint": { "en": "Shares a surname with City's earlier playmaker David.", "sk": "Má rovnaké priezvisko ako skorší tvorca hry City, David." },
          "distractors": { "en": ["João Cancelo", "Rúben Dias", "Bruno Fernandes"], "sk": ["João Cancelo", "Rúben Dias", "Bruno Fernandes"] }
        },
        {
          "topic": { "en": "Bernardo Silva", "sk": "Bernardo Silva" },
          "question": { "en": "Bernardo Silva became a mainstay under which Catalan manager, who led Manchester City to the treble in 2023?", "sk": "Bernardo Silva sa stal oporou pod ktorým katalánskym trénerom, ktorý doviedol Manchester City k trebletu v roku 2023?" },
          "answer": {
            "display": { "en": "Pep Guardiola", "sk": "Pep Guardiola" },
            "accept": { "en": ["pep guardiola", "guardiola", "josep guardiola"], "sk": ["pep guardiola", "guardiola"] }
          },
          "hint": { "en": "He previously won trebles with Barcelona in 2009.", "sk": "Predtým získal treble s Barcelonou v roku 2009." },
          "distractors": { "en": ["Mikel Arteta", "Unai Emery", "Xavi Hernández"], "sk": ["Mikel Arteta", "Unai Emery", "Xavi Hernández"] }
        },
        {
          "topic": { "en": "Pep Guardiola", "sk": "Pep Guardiola" },
          "question": { "en": "Between Barcelona and Manchester City, Guardiola managed which German club?", "sk": "Medzi Barcelonou a Manchestrom City trénoval Guardiola ktorý nemecký klub?" },
          "answer": {
            "display": { "en": "Bayern Munich", "sk": "Bayern Mníchov" },
            "accept": { "en": ["bayern munich", "bayern", "bayern munchen"], "sk": ["bayern mnichov", "bayern", "bayern munchen"] }
          },
          "hint": { "en": "The club of the Allianz Arena.", "sk": "Klub z Allianz Areny." },
          "distractors": { "en": ["Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen"], "sk": ["Borussia Dortmund", "RB Lipsko", "Bayer Leverkusen"] }
        },
        {
          "topic": { "en": "Bayern Munich", "sk": "Bayern Mníchov" },
          "question": { "en": "Which Bayern striker scored five goals in nine minutes against Wolfsburg in 2015?", "sk": "Ktorý útočník Bayernu strelil v roku 2015 päť gólov za deväť minút proti Wolfsburgu?" },
          "answer": {
            "display": { "en": "Robert Lewandowski", "sk": "Robert Lewandowski" },
            "accept": { "en": ["robert lewandowski", "lewandowski", "lewy"], "sk": ["robert lewandowski", "lewandowski", "lewy"] }
          },
          "hint": { "en": "A Polish striker who came from Borussia Dortmund.", "sk": "Poľský útočník, ktorý prišiel z Borussie Dortmund." },
          "distractors": { "en": ["Thomas Müller", "Mario Gómez", "Arjen Robben"], "sk": ["Thomas Müller", "Mario Gómez", "Arjen Robben"] }
        }
      ]
    }
  ]
};

