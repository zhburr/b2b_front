import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  weightConversion: number = 0.45359237;
  dimensionConversion: number = 2.54;
  cubicMeter: number = 1000000;
  cubicFeet: number = 1728;
  CentimeterSquareToMeter = 0.0001;
  SquareInchToFeetSquare = 0.0069444438888889;
  cubicMeterToFeet: number = 35.315;
  densityConvervsion: number = 16.02;
  constructor(private sharedService: SharedService) {}
  formatDate(date: any) {
    let monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thus', 'Fri', 'Sat'];
    let d = new Date(date);
    return [
      [days[d.getDay()] + ','],
      monthNames[d.getMonth()],
      [d.getDate() + ','],
      d.getFullYear(),
    ].join(' ');
  }
  compareDates(start: any, end: any) {
    start = new Date(start);
    end = new Date(end);

    if (start.getTime() <= end.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  arrayIncludesInObj(arr: any, key: any, valueToCheck: any) {
    return arr.some((value: any) => value[key] === valueToCheck);
  }

  removeDuplicates(arr: any[]) {
    return arr.filter(
      (v, i, a) =>
        a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
    );
  }

  getSingleArrayBykey(arr: any[], key: any) {
    return new Promise((resolve) => {
      if (arr.length) {
        resolve(arr.map((x) => x[key]));
      } else {
        resolve([]);
      }
    });
  }

  converDateToDMYFormat(cdate: any) {
    let date = new Date(cdate),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }

  converDateToDMFormat(cdate: any) {
    let date = new Date(cdate),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [mnth, day].join('-');
  }

  converForTimeZone(cdate: any) {
    var d = new Date(cdate);
    var convertDate =
      d.toISOString().substring(0, 10) + d.toISOString().substring(10);
    return convertDate;
  }
  // for displaying value in input
  fixedDecimalsWithOutrounding(
    number: number | string | undefined
  ): number | string {
    let num: number | string = Number(number);

    if (isNaN(num)) {
      return '';
    }

    if (
      String(num).split('.').length < 2 ||
      String(num).split('.')[1].length <= 2
    ) {
      num = num.toFixed(2);
    } else {
      num = Math.floor(num * 100) / 100;
      if (
        String(num).split('.').length < 2 ||
        String(num).split('.')[1].length <= 2
      ) {
        num = num.toFixed(2);
      }
    }

    return num;
  }
  //for our calculations so that variable type remains the same
  fixedDecimals(number: number | string | undefined): number {
    let num: number | string = Number(number);

    if (isNaN(num)) {
      return 0;
    }

    if (
      String(num).split('.').length < 2 ||
      String(num).split('.')[1].length <= 2
    ) {
      num = num.toFixed(2);
    } else {
      num = Math.floor(num * 100) / 100;
    }

    return Number(num);
  }

  convertLBSperPI3toKGperm3(density: number | string) {
    if (!density) return 0;
    if (typeof density === 'string') {
      density = Number(density);
    }

    return density * this.densityConvervsion;
  }

  convertKGperm3toLBSperPI3(density: number | string) {
    if (!density) return 0;
    if (typeof density === 'string') {
      density = Number(density);
    }

    return density / this.densityConvervsion;
  }

  convertKGintoLBS(weight: number | string) {
    if (!weight) return 0;
    if (typeof weight === 'string') {
      weight = Number(weight);
    }

    return weight / this.weightConversion;
  }

  convertLBSintoKG(weight: number | string) {
    if (!weight) return 0;
    if (typeof weight === 'string') {
      weight = Number(weight);
    }

    return weight * this.weightConversion;
  }

  convertCMintoINCH(dimension: number | string) {
    if (!dimension) return 0;
    if (typeof dimension === 'string') {
      dimension = Number(dimension);
    }

    return dimension / this.dimensionConversion;
  }

  converINCHintoCM(dimension: number | string) {
    if (!dimension) return 0;
    if (typeof dimension === 'string') {
      dimension = Number(dimension);
    }

    return dimension * this.dimensionConversion;
  }

  convertCubicCMtoM(length: number, width: number, thickness: number): number {
    return (length * width * thickness) / this.cubicMeter;
  }

  convertCubicINCHtoPI(
    length: number,
    width: number,
    thickness: number
  ): number {
    return (length * width * thickness) / this.cubicFeet;
  }

  convertCubicMeterToPi(volume: number) {
    return volume * this.cubicMeterToFeet;
  }
  convertCubicPiToMeter(volume: number) {
    return volume / this.cubicMeterToFeet;
  }
  calculateAreaInMeter(length: number, width: number) {
    return length * width * this.CentimeterSquareToMeter;
  }
  calculateAreaInSquareFeet(length: number, width: number) {
    return length * width * this.SquareInchToFeetSquare;
  }

  compareObjects(obj1: any, obj2: any): boolean {
    let objEqual = false;
    const obj1Keys = Object.keys(obj1).sort();
    const obj2Keys = Object.keys(obj2).sort();
    if (obj1Keys.length !== obj2Keys.length) {
      console.log(objEqual);
      return false;
    } else {
      const areEqual = obj1Keys.every((key, index) => {
        const objValue1 = obj1[key];
        const objValue2 = obj2[obj2Keys[index]];
        return objValue1 || objValue2 ? objValue1 == objValue2 : true;
      });

      return areEqual;
    }
  }
}
