import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

//#region controllers
import {
  artistsData,
  charactersData,
  classNamesData,
  clothesData,
  curiositiesData,
  debutsData,
  getAllClasses,
  getClassSaints,
  getClassesByArtist,
  getClassesByDebut,
  getSaintData,
  groupsAbelData,
  groupsApsuData,
  groupsAresData,
  groupsArtemisData,
  groupsArthurData,
  groupsAstraeaData,
  groupsAthenaData,
  groupsBalorData,
  groupsCronusData,
  groupsCyclopsData,
  groupsErisData,
  groupsGarnetData,
  groupsHadesData,
  groupsHakuryuData,
  groupsLamechData,
  groupsOdinData,
  groupsOthersData,
  groupsPallasData,
  groupsPoseidonData,
  groupsRaData,
  groupsTezcatlipocaData,
  groupsTyphonData,
  groupsZeusData,
  midiasData,
  ranksData,
  saintsData
} from './classes.controllers'
//#endregion

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  api = environment.apiRest;

  headers = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS'
  });

  artists: any = []
  characters: any = []
  classNames: any = []
  clothes: any = []
  curiosities: any = []
  debuts: any = []
  groupsAbel: any = []
  groupsApsu: any = []
  groupsAres: any = []
  groupsArtemis: any = []
  groupsArthur: any = []
  groupsAstraea: any = []
  groupsAthena: any = []
  groupsBalor: any = []
  groupsCronus: any = []
  groupsCyclops: any = []
  groupsEris: any = []
  groupsGarnet: any = []
  groupsHades: any = []
  groupsHakuryu: any = []
  groupsLamech: any = []
  groupsOdin: any = []
  groupsOthers: any = []
  groupsPallas: any = []
  groupsPoseidon: any = []
  groupsRa: any = []
  groupsTezcatlipoca: any = []
  groupsTyphon: any = []
  groupsZeus: any = []
  midias: any = []
  ranks: any = []
  saints: any = []

  constructor( private  http: HttpClient ) {
    if (environment.production) {
      this.artists = this.http.get(`${this.api}/artists`, { headers: this.headers });
      this.characters = this.http.get(`${this.api}/characters`, { headers: this.headers });
      this.classNames = this.http.get(`${this.api}/classNamesData`, { headers: this.headers });
      this.clothes = this.http.get(`${this.api}/clothes`, { headers: this.headers });
      this.curiosities = this.http.get(`${this.api}/curiosities`, { headers: this.headers });
      this.debuts = this.http.get(`${this.api}/debuts`, { headers: this.headers });
      this.groupsAbel = this.http.get(`${this.api}/groupsAbel`, { headers: this.headers });
      this.groupsApsu = this.http.get(`${this.api}/groupsApsu`, { headers: this.headers });
      this.groupsAres = this.http.get(`${this.api}/groupsAres`, { headers: this.headers });
      this.groupsArtemis = this.http.get(`${this.api}/groupsArtemis`, { headers: this.headers });
      this.groupsArthur = this.http.get(`${this.api}/groupsArthur`, { headers: this.headers });
      this.groupsAstraea = this.http.get(`${this.api}/groupsAstraea`, { headers: this.headers });
      this.groupsAthena = this.http.get(`${this.api}/groupsAthena`, { headers: this.headers });
      this.groupsBalor = this.http.get(`${this.api}/groupsBalor`, { headers: this.headers });
      this.groupsCronus = this.http.get(`${this.api}/groupsCronus`, { headers: this.headers });
      this.groupsCyclops = this.http.get(`${this.api}/groupsCyclops`, { headers: this.headers });
      this.groupsEris = this.http.get(`${this.api}/groupsEris`, { headers: this.headers });
      this.groupsGarnet = this.http.get(`${this.api}/groupsGarnet`, { headers: this.headers });
      this.groupsHades = this.http.get(`${this.api}/groupsHades`, { headers: this.headers });
      this.groupsHakuryu = this.http.get(`${this.api}/groupsHakuryu`, { headers: this.headers });
      this.groupsLamech = this.http.get(`${this.api}/groupsLamech`, { headers: this.headers });
      this.groupsOdin = this.http.get(`${this.api}/groupsOdin`, { headers: this.headers });
      this.groupsOthers = this.http.get(`${this.api}/groupsOthers`, { headers: this.headers });
      this.groupsPallas = this.http.get(`${this.api}/groupsPallas`, { headers: this.headers });
      this.groupsPoseidon = this.http.get(`${this.api}/groupsPoseidon`, { headers: this.headers });
      this.groupsRa = this.http.get(`${this.api}/groupsRa`, { headers: this.headers });
      this.groupsTezcatlipoca = this.http.get(`${this.api}/groupsTezcatlipoca`, { headers: this.headers });
      this.groupsTyphon = this.http.get(`${this.api}/groupsTyphon`, { headers: this.headers });
      this.groupsZeus = this.http.get(`${this.api}/groupsZeus`, { headers: this.headers });
      this.midias = this.http.get(`${this.api}/midias`, { headers: this.headers });
      this.ranks = this.http.get(`${this.api}/ranks`, { headers: this.headers });
      this.saints = this.http.get(`${this.api}/saints`, { headers: this.headers });
    } else {
      this.artists = artistsData;
      this.characters = charactersData;
      this.classNames = classNamesData;
      this.clothes = clothesData;
      this.curiosities = curiositiesData;
      this.debuts = debutsData;
      this.groupsAbel = groupsAbelData;
      this.groupsApsu = groupsApsuData;
      this.groupsAres = groupsAresData;
      this.groupsArtemis = groupsArtemisData;
      this.groupsArthur = groupsArthurData;
      this.groupsAstraea = groupsAstraeaData;
      this.groupsAthena = groupsAthenaData;
      this.groupsBalor = groupsBalorData;
      this.groupsCronus = groupsCronusData;
      this.groupsCyclops = groupsCyclopsData;
      this.groupsEris = groupsErisData;
      this.groupsGarnet = groupsGarnetData;
      this.groupsHades = groupsHadesData;
      this.groupsHakuryu = groupsHakuryuData;
      this.groupsLamech = groupsLamechData;
      this.groupsOdin = groupsOdinData;
      this.groupsOthers = groupsOthersData;
      this.groupsPallas = groupsPallasData;
      this.groupsPoseidon = groupsPoseidonData;
      this.groupsRa = groupsRaData;
      this.groupsTezcatlipoca = groupsTezcatlipocaData;
      this.groupsTyphon = groupsTyphonData;
      this.groupsZeus = groupsZeusData;
      this.midias = midiasData;
      this.ranks = ranksData;
      this.saints = saintsData;
    }
  }

  getAllClasses() {
    return getAllClasses(
      this.artists,
      this.characters,
      this.clothes,
      this.debuts,
      this.groupsAbel,
      this.groupsApsu,
      this.groupsAres,
      this.groupsArtemis,
      this.groupsArthur,
      this.groupsAstraea,
      this.groupsAthena,
      this.groupsBalor,
      this.groupsCronus,
      this.groupsCyclops,
      this.groupsEris,
      this.groupsGarnet,
      this.groupsHades,
      this.groupsHakuryu,
      this.groupsLamech,
      this.groupsOdin,
      this.groupsOthers,
      this.groupsPallas,
      this.groupsPoseidon,
      this.groupsRa,
      this.groupsTezcatlipoca,
      this.groupsTyphon,
      this.groupsZeus,
      this.midias,
      this.ranks,
      this.saints,
    );
  }

  getClass(className: string) {
    return getClassSaints(className);
  }

  getSaint(className: string, id: string) {
    return getSaintData(className, id);
  }

  /* unused routes
  getConstellations() {
    return this.http.get(`${this.api}/constellations`, { headers: this.headers });
  }

  getConstellation(id: string) {
    return this.http.get(`${this.api}/constellation/${id}`, { headers: this.headers });
  }

  getEvilStars() {
    return this.http.get(`${this.api}/evil-stars`, { headers: this.headers });
  }

  getEvilStar(id: string) {
    return this.http.get(`${this.api}/evil-star/${id}`, { headers: this.headers });
  }
  */

  getClassesByArtist(id: string) {
    return getClassesByArtist(id);
  }

  getClassesByDebut(id: string) {
    return getClassesByDebut(id);
  }

  getClassNames() {
    return this.classNames;
  }
}
