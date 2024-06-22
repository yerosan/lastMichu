
import MenuItem from '@mui/material/MenuItem';
import React, {useState, useEffect, useInsertionEffect} from 'react';
import { TextField, Button, Container, Stack, Paper } from '@mui/material';
import { Link } from "react-router-dom"
import { Approval } from '@mui/icons-material';
import axios from "axios"
import {useSelector, useDispatch} from 'react-redux'
import {Tab, Box} from "@mui/material"
import { TabList, TabContext, TabPanel } from '@mui/lab';
import Alert from '@mui/material/Alert';
import config from "../../config/config"
import FormHelperText from '@mui/material/FormHelperText';
import LinearProgress from '@mui/material/LinearProgress';
import { districtBranch } from './constant';
  

const currentDate=new Date()
const month = `0${currentDate.getMonth()+1}`.slice(-2);
const day = `0${currentDate.getDate()}`.slice(-2);
let today=currentDate.getFullYear()+"-"+month+"-"+day

 
const districtList=[
    {
    value:"Centeral Finfine",
    label:"Centeral Finfine"
   },
   {
    value:"West Finfine",
    label:"West Finfine"
   },
   {
    value:"North Finfine",
    label:"North Finfine"
   },
   {
    value:"East Finfine ",
    label:"East Finfine"
   },
   {
    value:"South Finfine",
    label:"South Finfine"
   }
]




// const districtBranch={
//   "centeralFinfine":[
//     'Aba Mela' ,
//     'Aba Nefso', 
//     'Abdisa Aga', 
//     'Agemsa',
//     'Aster Gano', 
//     'Badho Dachas', 
//     'Baro Korma', 
//     'Birbirsa', 
//     'Birmaji', 
//     'Bombtera', 
//     'Catherine Hamlin',
//     'Chachu',
//     'Chafe Anane', 
//     'Chafe Muda', 
//     'Churchill' ,
//     'Dalatti', 
//     'Debasso',
//     'Dolo Bidena', 
//     'Edao Boru', 
//     'Finfine', 
//     'Gebeyehu Gurmu' ,
//     'Gojam Berenda' ,
//     'Hailamariam Gamada',
//     'Haile Fida' ,
//     'Hilal' ,
//     'Hurufa Rare' ,
//     'Jimma Sanbate' ,
//     'Kebena' ,
//     'Kello Mesqela' ,
//     'Kersa Main' ,
//     'Mechaf Tulama' ,
//     'Melka Oboshe', 
//     'Merkato ',
//     'Mesalemia' ,
//     'Meskel Flower' ,
//     'Mina ',
//     'Oda' ,
//     'Prof. Gebissa',
//     'Robale' ,
//     'Sheger' ,
//     'Sinqee' ,
//     'Sora Lume' ,
//     'Sulula Garbi' ,
//     'Ummu-Ayman',
//     'Wayyu', 
//     'Wirtu Merkato' ,
//     'Yai Goro' ,
//     "Yai Gulele" ,
    
//     ],
    
//     "adama":[
//      "Adama" ,
//      "Adea ",
//      "Artu ",
//      "Awash Melkasa ",
//      "Awash Sebat Kilo" ,
//      "Baka Ijo Eco ",
//      "Barecha", 
//      'Bedhatu ',
//      'Bilal' ,
//      'Bishoftu ',
//      'Boku Shenen', 
//      'Bole Nurahera' ,
//      'Boset' ,
//      'Bote' ,
//      'Burka ',
//      'Chafe', 
//      'Dabe Soloke' ,
//      'Dagaga',
//      'Dambala micro', 
//      'Derartu Tulu', 
//      'Dhadacha Arara',
//      'Dhaka Adi',
//      'Dire Eco' ,
//      'Dire Jitu', 
//      'Ela Bela',
//      'Ganda Hara', 
//      'Gara Baru', 
//      'Godino Eco', 
//      'Gumbichu', 
//      'Gurmu', 
//      'Hadho Eco', 
//      'Haro Adi', 
//      'Hawas',
//      'Hora Arsedi', 
//      'Karayu' ,
//      'Kilole' ,
//      'Kiltu Lume', 
//      'Koka',
//      'Liban Chukala',
//      'Lugo',  
//     ' Meki',
//      'Mojo', 
//      'Oda Bokota', 
//      'Qechema', 
//      'Qoche',
//      'Qurqura', 
//      'Torban Garba', 
//      'Torban Obo', 
//      'Tullu Jada Eco', 
//      'Wanji', 
    
//     ],
//     "asalla":[
//     'Abba Jama',
//     "Abomsa",
//     "Addele",
//     "Anole",
//     "Arboye",
//     "Asela",
//     "Badr",
//     "Bale Gesgar",
//     "Bokoji",
//     "Boru Jawi",
//     "Chilalo",
//     "Chole",
//     "Digalu",
//     "Diksis",
//     "Dodota",
//     "Ego",
//     "Eteya",
//     "Golja",
//     "Gololcha",
//     "Habe",
//     "Halila",
//     "Huruta",
//     "Kersa Arsi",
//     "Kula",
//     "Lenjiso Diga",
//     "Lole Bulchana eco",
//     "Meraro",
//     "Negelle Arba Gugu",
//     "Ogolcho",
//     "Robe Dedea",
//     "Sagure",
//     "Salahadin Ali-Ayub",
//     "Semira Kolba",
//     "Shirka",
//     "Siltana",
//     "Sire Arsi",
//     "Tijo",
//     "Tiyo",
//     "Xicho",
//     ],
    
//     "bale":[
//     "Agarfa",
//     "Ali",
//     "Burka Walabu",
//     "Dinsa Eco",
//     "Dinsho",
//     "Dolo Mana",
//     "Dolosebro",
//     "Gasara",
//     "GeneralWakoGutu",
//     "Ginnir",
//     "Goba",
//     "Goro",
//     "Harana Buluq",
//     "Haro Dumal",
//     "Holqa Sofumer Eco",
//     "Jarra",
//     "Mada Walabu",
//     "Maliyu",
//     "Oda Roba Eco",
//     "Rayan",
//     "Rayitu",
//     "Robe",
//     "Sanate",
//     "Selam",
//     "Selka Bakaye Eco",
//     "Sinana",
//     "Sofomar",
//     ],
    
//     "chiro":[
//     'Al Bukhari',
//     'Anchar',
//     'Arba Eco""',
//     'Assebot New',
//     'Baroda',
//     'Bedessa',
//     'Boke Tiko',
//     'Burqa Dhintu  New',
//     'Chiro',
//     'Deder',
//     'Defo Eco',
//     'Dhumuga',
//     'Doba',
//     'Furqan',
//     'Gara Muktar Eco',
//     'Garu hira',
//     'Gelemeso',
//     'Gemechis',
//     'Hardim Eco',
//     'Haro Chercher',
//     'Hirna',
//     'Jaja',
//     'Kamona',
//     'Kara Makala Eco',
//     'Kara Mile',
//     'Kobo',
//     'Mechara',
//     'Melka Balo',
//     'Michata',
//     'Miesso',
//     'Milqaye',
//     'Murtiguto',
//     'Oda Bultum',
//     'Sheik Moh. Reshad',
//     'Shenen dhugo',
//     'Soqa',
//     'Tullo',
//     ],
    
//     "dirreDawa":[
//         'Abdi Qophe',
//     'Abubeker Al-Siddiq',
//     'Afren Kelo ',
//     'Ahmed Imam' ,
//     'Arefa' ,
//     'Aw-Abadir',
//     'Babile', 
//     'Badano' ,
//     'Bekerware' ,
//     'Bereka' ,
//     'Biftu',
//     'Bulullo ',
//     'Burka Tirtira' ,
//     'Chalanqo', 
//     'Chinaksen',
//     'Dire Dawa',
//     'D/Dawa Industry Park',
//     'Dire Xayara Eco',
//     'DireDawa Rashotel',
//     'Elemo Qiltu' ,
//     'Fachatu Eco',
//     'Falana Eco', 
//     'Fedis' ,
//     'Fugnan Bira', 
//     'Gara Muleta' ,
//     'Gode ',
//     'Goro Muti' ,
//     'Greek Camp' ,
//     'Hafatessa ',
//     'Haramaya',
//     'Hikma',
//     'Hundene' ,
//     'Imam A Mesjid' ,
//     'Iqra',
//     'Jahan Jarso' ,
//     'Jara Abageda ',
//     'Jigjiga',
//     'Kali' ,
//     'Kefira ',
//     'Kombolcha',
//     'Kurfa Challe',
//     'Laga Oda',
//     'Maya Eco',
//     'Mayu Muluke',
//     'Medinat Al-Mun',
//     'Megalla ',
//     'Melka Jebdu', 
//     'Midhega',
//     'Mustafa Harawe ',
//     'Qulubi', 
//     'Ramadan',
//     'Sabian',
//     'Sheik Bek/Sapello',
//     'Taiwan', 
//     'Togo Wuchale',
//     'Weltea' ,
//     ],
    
//     "eastFinfine":[
//         'Abebech Gobena',
//     'Abebie Tufa',
//     'Agari Tullu',
//     'Akaki',
//      'Baro Tumsa' ,
//     'Beshale',
//      'Bole Airport ',
//     'Bole Arabsa',
//     'Bole Atlas',
//     'Bole Bulbula',
//     'Bole Lami',
//     'Bole Medan',
//     'Bole Michael',
//     'Bole Ruwanda',
//     'Boru Bilo',
//     'Burqa Shobe',
//     'Col Alamu Qixxessa',
//     'Damo Dadi',
//     'Dhaga Bora',
//     'Dukem Industry',
//     'Dulo',
//     'Eka Abado',
//     'Erer',
//     'Figa',
//     'Gada Melba',
//     'Gadisa Birru',
//     'Gara Bushu',
//     'Gara Duba',
//     'Gawassa',
//     'Gelan',
//     'Gerji',
//     'Gurd Shola',
//     'Haile Gebre',
//     'Handura Tulama',
//     'Haramain',
//     'Harbu',
//     'Hayahulet Mazo',
//     'Jate',
//     'Karra Qallu',
//     'Koticha',
//     'Koye Fache',
//      'Kura Jida' ,
//     'Lami Industrial',
//     'Lauret Tsegaye',
//     'Lema Guya',
//     'Lemo',
//     'Malka Shane',
//     'Mammo Mazammir',
//     'Mari Luqe',
//     'Melba',
//     'Migira Micro',
//     'Oda Nabe',
//     'Sadan Ekka',
//     'Saris',
//     'Shabu Ejersa',
//     'Shala',
//     'Tirunesh Dibaba',
//     'Tulu Dimtu',
//     'Wami Biratu',
//     'Wara Ganu',
//     'Xadacha',
//     'Yuba',
//     ],
    
//     "hawasa":[
//     'Adola',
//     'Alamura',
//     'Aleta Wondo',
//     'Alnasir Sub',
//     'Bensadaye',
//     'Beriso Dukale Micro',
//     'Birbirsa Kojowa  eco',
//     'Bore',
//     'Bule Hora',
//     'Chelektu',
//     'Chuko',
//     'Daka',
//     'Dari kidame  eco',
//     'Deraro',
//     'Dilla',
//     'Dolo ado Sub', 
//     'El-waye eco',
//     'Fura',
//     'Gedeb',
//     'Gomole  eco',
//     'Gudatu Robale eco',
//     'Harakelo',
//     'Hawassa',
//     'Haya Dima',
//     'lakku',
//     'Madha Galma Micro',
//     'Moyale Sub',
//     'Negelle Borena',
//     'Nur',
//     'Odoshakiso',
//     'Qarcha',
//     'Shafeta',
//     'Sumuda',
//     'Tabor',
//     'Taltale ',
//     'Tulufarda ',
//     'Uraga',
//     'Wadera Micro ',
//     'Warka',
//     'Yabelo',
//     'Yirgachefe',
//     'Yirgalem',
//     ],
    
//     "Hosana":[
//         "Arba Minch",
//     "Areka",
//     "Boditi",
//     "Bonosha",
//     "Bui",
//     "Butajira",
//     "Conolel Bezabih Petros",
//     "Damboya",
//     "Dawuro",
//     "Doyo Gena",
//     "Durame",
//     "Enseno",
//     "Geja Geribo",
//     "Gesupa",
//     "Hadero",
//     "Halaba Kulito",
//     "Hambecho Eco",
//     "Hamus Gebeya Eco",
//     "Homecho",
//     "Hosana",
//     "Jajura",
//     "Kela",
//     "Konso",
//     "Koshe Mareko",
//     "Kuno Gebeya Eco",
//     "Lisana",
//     "OMER IBN AL-KHATTAB",
//     "Sankura",
//     "Sechduna",
//     "Shinshicho",
//     "Shonkola",
//     "Tona",
//     "Tunto Eco",
//     "Wolayita Soddo",
//     "Darge",
//     "Wolkite",
    
//     ],
    
//     "jimma":[
//          "Aba Jifar", 
//      "Agaro",
//      "Alge Sachi", 
//      "Asendabo", 
//      "Awetu", 
//      "Bedelle",
//      "Bonga", 
//      "Botor Xolay ",
//      "Bure Illu", 
//      "Chora", 
//      "Dambi", 
//      "Darimu", 
//      "Dedo",
//      "Dusta Eco",
//      "Gachi",
//      "Gambella", 
//      "Gera", 
//      "Gore", 
//      "Hirmata",
//      "Hurumu", 
//      "Jiren", 
//      "Limu Genet", 
//      "Limu Seqa", 
//      "Melka dabena", 
//      "Meti", 
//      "Mettu", 
//      "Mizan Aman", 
//      "New land", 
//      "Omo Nada",
//      "Saxama", 
//      "Sedecha", 
//      "Seglen Ilu",
//      "Seka Chekorsa", 
//      "Serbo", 
//      "Shabe", 
//      "Shenene Gibe", 
//      "Sigimo", 
//      "Sokoru",
//      "Sor", 
//      "Tepi", 
//      "Tobba", 
//      "Yayo", 
//      "Yebu", 
//     " yukiro kamise",
//     ],
    
//     "naqamte":[
//         'Abasena',
//     'Agamsa Migir',
//     'Amuru',
//     'Anfillo',
//     'Anger Gute',
//     'Anno',
//     'Asosa',
//     'Ayira',
//     'Babo Gambel',
//     'Bake Jamma',
//     'Begi',
//     'Bila',
//     'Bokku',
//     'Boneya Boshe',
//     'Burqa Jato',
//     'Chalalaqi',
//     'Chanqa Birbir',
//     'Chawaqa',
//     'Dambi Dollo',
//     "Fincha'a",
//     'Ganji',
//     'Gida Ayana',
//     'Gidami', 
//     'Gimbi',
//     'Gudetu Arjo',
//     'Guduru',
//     'Guliso',
//     'Hababo Gudur',
//     'Harato',
//     'Hawa Gelan',
//     'Jimma Arjo',
//     'Jimma Rare',
//     'Kiltu Karra ',
//     'Kiremu',
//     'Komto',
//     'Leka',
//     'Leka Dulacha', 
//     'Mandi',
//     'Muka Arara ',
//     'Nedjo',
//     'Nekemte',
//     'Nunu Kumba',
//     'Oda Karra',
//     'Oliqa Dingil',
//     'Qebe',
//     'Qeto Machara',
//     'Sayo Nole',
//     'Shambu',
//     'Sibu Sire',
//     'Tulu Gana',
//     'Ukke',
//     ],
    
//     "northFinfine":[
//          "Abichu Nya'a" ,
//     'Adami',  
//      'Addisu Gebeya',  
//      'Akako',
//      'Aleltu' , 
//     'Asmerom',
//      'Awaro',
//      'Bakalcha', 
//      'Bake', 
//     'Bilile', 
//      'Borri',  
//      'Chafe Arara',  
//      'Chancho',  
//      'CMC',
//      'Dale Dembel', 
//      'Debre berhan', 
//      'Dega Gora Eco',  
//      'Derra',  
//      'Didimtu',
//      'Duber eco',
//      'F/ Legasiyon', 
//      'Fiche',  
//      'Fitala',
//     'Folle', 
//      'Gachana', 
//      'Gebra Guracha', 
//      'Gora', 
//      'Gulele',  
//      'Hambiso Eco',
//      'Harru Maru', 
//      'Hidhabu Abote' ,
//      'Hurufa farado', 
//      'Kara Mexi',  
//      'Karra Allo', 
//      'Karra Xuxxo',  
//      'Konno""',
//      'Kotobe',  
//      'Kuyyu', 
//      'Laga Bari', 
//      'Lamberet',  
//      'Lega bilawo', 
//      'Lega Jidha', 
//      'Lega Tafo',  
//      'Madaro', 
//      'Mujja',  
//      'Muka Turi',  
//      'Mulo', 
//      'Raba dori', 
//      'Raso',
//      'Salgan Eggu',  
//      'Sendafa Bake',  
//      'Shararo',  
//      'Shenen Jida',  
//      'Sheno' , 
//      'Shufune',  
//      'Sululta', 
//      'Tokumma',  
//      'Tufa Muna',  
//      'Tulu Fati' ,
//      'Tulu Kurfo Ec', 
//      'Wabari', 
//      'Warra Jarso',  
//      'Wasarbi',  
//      'Yaya Gulale', 
//      'Zerihun Wadajo',  
//     ],
    
//     "shashamanne":[
//     'ADABA', 
//     'AJE' ,
//     'Allache',
//      'AMAL', 
//      'Ardaita eco friendly', 
//      'ARSINEGELE', 
//      'AWASHO', 
//      'Batu', 
//      'Birbirsa qaraxa' ,
//      'BISHANGURACHA ',
//      'Bulbula', 
//      'Dida boqe',
//      'DODOLA' ,
//      'FEJIR' ,
//     'HAMZA MESGID', 
//      'HARA DEMBAL',  
//      'HARUFA', 
//      'HASASA',
//      'HEBANARSI' ,
//      'Heraro', 
//      'IMAN',
//      'KILTU DEMA',
//      'KOFELE', 
//      'KOKOSA',
//      'KUYERA', 
//      'Meja dema',
//      'Melka oda', 
//      'NaGELE HASASA', 
//      'Negelle Metama Eco friendly', 
//      'NESIHA', 
//      'ODABILIBILA',
//      'QORE',
//      'Serofta Eco friendly', 
//      'SHASHEMENE',
//      'Uta kaka eco friendly', 
//      'UTAWAYU', 
//      'WARQA', 
//     ],
    
//     "southFinfine":[
//          "Adadi Eco", 
//      "Ali Bira", 
//      "Asgori", 
//      "Ayetu", 
//      "Bakannisa", 
//      "Bantu", 
//      "Burka Wayu", 
//      "Butta", 
//      "Chalchali", 
//      "Darraba Bido", 
//      "Dawo", 
//      "Ertu", 
//      "Furi",
//      "Gara Bolo", 
//      "Gara Dhanqu", 
//      "Gofa Gabriel",
//      "Gofa Mazoria", 
//      "Golbo", 
//      "Gotera", 
//      "Gudattu Qarsa Eco",
//      "Guge", 
//      "Halchisa", 
//      "Haro Wanchi", 
//      "Horsisa", 
//      "Illanso",
//      "Ittimako", 
//      "Jahan Ameya", 
//      "Jamo", 
//      "Koromi", 
//      "Labu", 
//      "Lafto",
//      "Laga Jaja",
//      "Leman",
//      "Lume",
//      "Mako Bili", 
//      "Marwa", 
//      "Melka Hurbu", 
//      "Merde",
//      "Mogle", 
//      "Nonno", 
//      "Ochocha", 
//      "Ona Jarsayu", 
//      "Qacha", 
//      "Qorke Karabu", 
//      "Raphe", 
//      "Roge",
//      "Sadan Soddo", 
//      "Sebeta Ayo", 
//      "Sebeta Hawas", 
//      "Soddo Dachi" ,
//      "Soddo Garbo Eco" ,
//      "Taji", 
//      "Tiksa Jima", 
//      "Torban Wale", 
//      "Tullu Ejersa", 
//      "Tulu Bolo", 
//      "Tulu Dhertu", 
//      "Urji",
//      "Wasanu Dido", 
//      "Wato", 
//      "Weliso", 
//      "Ya'i Melka", 
//     ],
    
//     "westFinfine":[
//         'Aba Gemechis',
//     'Abishe Gerba',
//     'Abuna',
//     'Ada Barga',
//     'Ako Manoye' ,
//     'Ambo',
//     'Ansar',
//     'Asgori-Suba Eco', 
//     'Asko',
//     'Axale Jatani',
//     'Ayer Tena',
//     'Bako Tibe',
//     'Bethel',
//     'Boke',
//     'Boku Migra Bake',
//     'Boru Joka',
//     'Buludo',
//     'Burayu',
//     'Dire Hinchini' ,
//     'Dire Sololiya',
//     'Ebisa Adugna',
//     'Ejere ',
//     'Gafarsa Nono',
//     'Gedo ',
//     'Gefersa',
//     'Ginchi',
//     'Goro Qerensa',
//     'Guddu',
//     'Guder',
//     'Guje',
//     'Hayyu',
//     'Holeta',
//     'Ilu Gelan', 
//     'Irbu',
//     'Jagema Bedhane',
//     'Jaldu',
//     'Jibat',
//     'Karra Qore',
//     'Katta',
//     'Kolfe',
//     'Kolobo',
//     'Kombe',
//     'Kusaye',
//     'Kutaye', 
//     'Lega Saqo',
//     'Liban Jawi',
//     'Makkat Al Mukaram',
//     'Melka Gefersa',
//     'Meta Walkite', 
//     'Midakegni',
//     'Mogor',
//     'Nejashi',
//     'Oda Bisil',
//     'Odo Liben',
//     'Olonkomi', 
//     'Qajela Doyo',
//     'Qale',
//     'Taqwa',
//     'Wadessa',
//     'Warqa Qore Eco',
//     ],
    
//     "bahirdar":[
//     'Bahir Dar',
//     'Bure',
//     'D-Markos',
//     'Dessie',
//     'G-wuha',
//     'Gondar',
//     'Halal',
//     'Kamise',
//     'Metema',
//     'M-Dawud',
//     'Tana',
//     'L.S-Alimirah',
//     'Humera',
//     'Wollo-Combolcha',
//     'Injibara',
//     ],
    
//     "mekelle":[
//     'Adigrat',
//     'Adihaki',
//     'Adwa',
//     'Aksum',
//     'Djibruk',
//     'Enkodo',
//     'Godena Selam',
//     'Mekele',
//     'Shire',
//     'Wukre']
// }
const SalesTarget = () => {
  const userIn=useSelector(state=>state.logins)
    const [districtLists, setDistrictLists]=useState(null)
    const [loadingDistrict, setLoadingDistrict]=useState(false)
    const [errors, setErrors]=useState(false)

    const initialVaue={
      userName:userIn.data.userName,
      districtName:"",
      branchName:"",
      uniqueCustomer:"",
      disbursedAmount:"",
      numberOfAccount:"",
      income:"",
      date:today
  }
  
    const [userDistrict, setUserDistrict]=useState(null)
    const [salseData,setSalseData]=useState(initialVaue)
    const [formActivater, setFormActivater]=useState(false)
    const alluserss=useSelector(state=>state.allUser)
    const addCollection=useSelector(state=>state.collection)
    const [dataAdding, setDataAdding]=useState(false)
    const [error, setError]=useState(false)
    let [userDistrictss, setUserDistrictss]= useState([])
    const dispatch=useDispatch()

    const validatePhoneNumber = (phoneNumber) => {
      return phoneNumber.length === 12 && /^\d+$/.test(phoneNumber); // Checks if the phone number is exactly 12 digits and contains only numeric characters
    };

    const handleForm=(e)=>{
        const values=e.target.value
        const namess=e.target.name
        if(namess=='districtName' && values !=""){
          setSalseData((prevState) => ({
            ...prevState,
            "branchName": "",
          }));
          setFormActivater(true)
         }

        setSalseData((prevState) => ({
          ...prevState,
          [namess]: values,
        }));
    }

    const getDistrict= async()=>{
      try{
        let usersDistrict= await axios.get(`${config.apiUrl}/salse/userDistrict/${userIn.data.userId}`)
        const Districtsss=[]
        if(usersDistrict.data.message=="succeed"){
          const data=usersDistrict.data.data
          let datas= Object.keys(usersDistrict.data.data)
          await Promise.all(datas.map(district=>{
            if(data[district]===true){
              Districtsss.push(
                {value:district,
                 label:district
                }
              )
            }
          }))
         setUserDistrict(usersDistrict.data.data)
         setUserDistrictss(Districtsss)
        }else{
          setUserDistrict(usersDistrict.data.message)
          setErrors(true)
        }
      }catch(error){
        console.log("The error", error)
      }
    }


    const addSalse=async()=>{
      try{
        let addingSalse= await axios.post(`${config.apiUrl}/salse/addTarget`, salseData)
        if(addingSalse.data.message=="succeed"){
          alert("Data submited")
        }
        else{
         alert(addingSalse.data.message)
        }
      
      }catch(error){
        alert ("Something went wrong")
      }
    }

    const loadDistrictList=async()=>{
      try{
      let distrList= await axios.get(`${config.apiUrl}/salse/districtList`)
      if(distrList.data.message=="succeed"){
          setDistrictLists(distrList.data.data)
          setLoadingDistrict(true)
      }else{
        setErrors(distrList.data.message)
        setErrors(true)
      }
    }catch(error){
      console.log("the Error", error)
      setDistrictLists("Something went wrong")
      setErrors(true)
    }
    }


 
    function handleSubmit(event) {
        event.preventDefault();
        addSalse()
        setFormActivater(false)
        setSalseData(initialVaue) 
    }
  useEffect(()=>{
    loadDistrictList()
    getDistrict()
  }, [])
    return (
        <React.Fragment>
          {(userIn.loading || districtLists==null )?  
          <div className='flex items-center justify-center h-full w-full' >
          <Stack sx={{ width: '100%', color: 'grey.500' }}>
            <LinearProgress color="secondary" />
          </Stack>
        </div>:
       <div>
       {(userIn.error !=="" || error) ? 
       <di> {userIn.error !== "" ?
          <Alert sx={{mt: 2, mb: 2}} severity="error">{userIn.error}</Alert>:
          <Alert sx={{mt: 2, mb: 2}} severity="error">{districtLists}</Alert>}
        </di>:
       <div>
        {userIn.data &&
              <Paper >
              <div className='p-6'>
              
                  <h2 className=
                      'font-serif font-semibold text-xl p-2'
                  >Target Form</h2>
                  <form onSubmit={handleSubmit}>
                      <div className='flex  gap-4 pb-2'>
                          <div className="flex flex-col gap-2 w-full">
                              <Box
                              component="form"
                              sx={{
                                '& .MuiTextField-root': { my:1 ,width: '100%' },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <div>
                                <TextField
                                 select
                                  type='text'
                                  id="district"
                                  label="Select district"
                                  name='districtName'
                                  value={salseData.districtName}
                                  placeholder='Select district'
                                  onChange={handleForm}
                                  required
                                >
                                    {userDistrictss.map((option) => (
                                      <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                </TextField>
                              </div>
                              </Box>
                              {formActivater && 
                              <Box
                              component="form"
                              sx={{
                                '& .MuiTextField-root': { my:1 ,width: '100%' },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <div>
                                <TextField
                                 select
                                  type='text'
                                  id="branch"
                                  label="Select branch"
                                  name='branchName'
                                  value={salseData.branchName}
                                  placeholder='Select branch'
                                  onChange={handleForm}
                                  required
                                >
                                    {districtBranch[salseData.districtName].map((option) => (
                                      <MenuItem key={option} value={option}>
                                        {option}
                                      </MenuItem>
                                    ))}
                                </TextField>
                              </div>
                              </Box>
                             }



                              <Box
                                  component="form"
                                  sx={{
                                    '& .MuiTextField-root': { my:1 ,width: '100%' },
                                  }}
                                  noValidate
                                  autoComplete="off"
                                >
                                  <div>
                                    <TextField
                                      type="number"
                                      id="numberOfAccount"
                                      name='numberOfAccount'
                                      label="Number of account"
                                      value={salseData.numberOfAccount}
                                      placeholder='Enter number of account'
                                      onChange={handleForm}
                                      required
                                    >
                                    </TextField>
                                  </div>
                              </Box>

                              <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="uniqueCustomer"
                                    label="Unique customer"
                                    onChange={handleForm}
                                    value={salseData.uniqueCustomer}
                                    placeholder='Enter unique customer'
                                    fullWidth
                                    required
                                    error={error}
                                    sx={{my:1 }}
                              >
                              </TextField> 
                          </div>

                          <div className='flex flex-col gap-2 w-full'>
                              <Box
                                component="form"
                                sx={{
                                  '& .MuiTextField-root': { my:1 ,width: '100%' },
                                }}
                                noValidate
                                autoComplete="off"
                              >
                                <div>
                                  <TextField
                                    id="disbursedAmount"
                                    label="Disbursed amount"
                                    name='disbursedAmount'
                                    value={salseData.disbursedAmount}
                                    placeholder='Enter disbursed amount'
                                    onChange={handleForm}
                                    required
                                  >
                                  </TextField>
                                </div>
                              </Box>

                              <TextField
                                    type="number"
                                    variant='outlined'
                                    color='primary'
                                    name="income"
                                    label="Income"
                                    onChange={handleForm}
                                    value={salseData.income}
                                    placeholder='Enter income'
                                    required
                                    fullWidth
                                    sx={{my:1 }}
                                />
                              <TextField
                                  type="date"
                                  // inputProps={{ format: 'yyyy-MM-dd' }}
                                  // defaultValue={salseData.date}
                                  variant='outlined'
                                  name="date"
                                  color='primary'
                                  onChange={handleForm}
                                  // placeholder={salseData.date}
                                  value={salseData.date}
                                  fullWidth
                                  required
                                  sx={{my:1 }}
                              />
                          </div>
                      </div>

                      <Button variant="outlined" color="primary" type="submit">Submit</Button>
                      
                  </form>
                  
              </div>

              </Paper>

            }
              </div> 
              
              }
            </div>
          }
        </React.Fragment>
    )
}
export default SalesTarget;