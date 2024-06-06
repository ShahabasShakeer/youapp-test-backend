import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './models/profile.model';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel('Profile') private profileModel: Model<Profile>,
  ) {}

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { birthday } = createProfileDto;
    const horoscope = this.calculateHoroscope(birthday);
    const zodiac = this.calculateZodiac(birthday);
    const createdProfile = new this.profileModel({ ...createProfileDto, horoscope, zodiac });
    return await createdProfile.save();
  }

  async getProfile(userId: string): Promise<Profile> {
    return await this.profileModel.findOne({ userId }).exec();
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const { birthday } = updateProfileDto;
    let horoscope: string;
    let zodiac: string;

    if (birthday) {
      horoscope = this.calculateHoroscope(birthday);
      zodiac = this.calculateZodiac(birthday);
    }

    return await this.profileModel.findOneAndUpdate(
      { userId },
      { ...updateProfileDto, horoscope, zodiac },
      { new: true }
    ).exec();
  }

  private calculateHoroscope(birthdayString: Date): string {
    // console.log("#### Birthday Type: ", typeof birthday);
    // console.log("#### Birthday: ", birthday);
    let birthday = new Date(birthdayString);
    const month = birthday.getMonth() + 1; // Months are 0-11 in JavaScript
    const day = birthday.getDate();

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return 'Aries';
    } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return 'Taurus';
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) {
      return 'Gemini';
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      return 'Cancer';
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return 'Leo';
    } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return 'Virgo';
    } else if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) {
      return 'Libra';
    } else if ((month === 10 && day >= 24) || (month === 11 && day <= 21)) {
      return 'Scorpius';
    } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return 'Sagittarius';
    } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return 'Capricornus';
    } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return 'Aquarius';
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return 'Pisces';
    }
  }

  private calculateZodiac(birthdayString: Date): string {
    let birthday = new Date(birthdayString);
    const year = birthday.getFullYear();

    const zodiacMap: { [key: number]: string } = {
      2024: 'Dragon', 2023: 'Rabbit', 2022: 'Tiger', 2021: 'Ox', 2020: 'Rat',
      2019: 'Pig', 2018: 'Dog', 2017: 'Rooster', 2016: 'Monkey', 2015: 'Goat',
      2014: 'Horse', 2013: 'Snake', 2012: 'Dragon', 2011: 'Rabbit', 2010: 'Tiger',
      2009: 'Ox', 2008: 'Rat', 2007: 'Boar', 2006: 'Dog', 2005: 'Rooster',
      2004: 'Monkey', 2003: 'Goat', 2002: 'Horse', 2001: 'Snake', 2000: 'Dragon',
      1999: 'Rabbit', 1998: 'Tiger', 1997: 'Ox', 1996: 'Rat', 1995: 'Boar',
      1994: 'Dog', 1993: 'Rooster', 1992: 'Monkey', 1991: 'Goat', 1990: 'Horse',
      1989: 'Snake', 1988: 'Dragon', 1987: 'Rabbit', 1986: 'Tiger', 1985: 'Ox',
      1984: 'Rat', 1983: 'Boar', 1982: 'Dog', 1981: 'Rooster', 1980: 'Monkey',
      1979: 'Goat', 1978: 'Horse', 1977: 'Snake', 1976: 'Dragon', 1975: 'Rabbit',
      1974: 'Tiger', 1973: 'Ox', 1972: 'Rat', 1971: 'Boar', 1970: 'Dog',
      1969: 'Rooster', 1968: 'Monkey', 1967: 'Goat', 1966: 'Horse', 1965: 'Snake',
      1964: 'Dragon', 1963: 'Rabbit', 1962: 'Tiger', 1961: 'Ox', 1960: 'Rat',
      1959: 'Boar', 1958: 'Dog', 1957: 'Rooster', 1956: 'Monkey', 1955: 'Goat',
      1954: 'Horse', 1953: 'Snake', 1952: 'Dragon', 1951: 'Rabbit', 1950: 'Tiger',
      1949: 'Ox', 1948: 'Rat', 1947: 'Boar', 1946: 'Dog', 1945: 'Rooster',
      1944: 'Monkey', 1943: 'Goat', 1942: 'Horse', 1941: 'Snake', 1940: 'Dragon',
      1939: 'Rabbit', 1938: 'Tiger', 1937: 'Ox', 1936: 'Rat', 1935: 'Boar',
      1934: 'Dog', 1933: 'Rooster', 1932: 'Monkey', 1931: 'Goat', 1930: 'Horse',
      1929: 'Snake', 1928: 'Dragon', 1927: 'Rabbit', 1926: 'Tiger', 1925: 'Ox',
      1924: 'Rat', 1923: 'Boar', 1922: 'Dog', 1921: 'Rooster', 1920: 'Monkey',
      1919: 'Goat', 1918: 'Horse', 1917: 'Snake', 1916: 'Dragon', 1915: 'Rabbit',
      1914: 'Tiger', 1913: 'Ox', 1912: 'Rat',
    };

    return zodiacMap[year];
  }
}
