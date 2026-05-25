import { test, expect } from '@playwright/test';
import path from 'path';
import { readCSV } from '../utils/csvReader.js';

const BASE_URL = 'https://uatapi.lokakeralamonline.kerala.gov.in/api/v1';

test.describe('API Testing using Playwright', () => {

  let userId;
test('POST - Get all the officers list', async ({ request }) => {
    const response = await request.post(`${BASE_URL}`, {
      data: 
      {
    "functionName": "get-officers"
      }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    //expect(responseBody.name).toBe('Midhun');
    //expect(responseBody.job).toBe('QA Engineer');
    console.log('Response Body:', responseBody);
    //userId = responseBody.id;
  });

test('Onboarding users using CSV data', async ({ request }) => {

    const csvPath = path.join( process.cwd(),'test-data','signupdata.csv');
   const users = await readCSV(csvPath);

  for (const user of users) {

    // Build payload from CSV
    const payload = {
      functionName: 'sign-up',
      firstName: user.firstName,
      middleName: user.middleName || '',
      lastname: user.lastname,
      emailId: user.emailId,
      profilePic: '',
      smlType: user.smlType,
      dob: user.dob,
      gender: user.gender,
      mobile: user.mobile,
      whatsappNumber: user.whatsappNumber,
      whatsappUpdates: user.whatsappUpdates,
      password: user.password,
      useSameNumberForWhatsapp: user.useSameNumberForWhatsapp,
      terms: user.terms,
      countryName: user.countryName,
      countryCode: user.countryCode,
      regionName: user.regionName,
      regionCode: user.regionCode,
      cityName: user.cityName,
      cityCode: user.cityCode,
      isEmailVerified: user.isEmailVerified,
      occupation: Number(user.occupation),
      outSideYear: Number(user.outSideYear),
      longitude: Number(user.longitude),
      latitude: Number(user.latitude)
    };
    const response = await request.post(`${BASE_URL}`,
      {
        data: payload,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const responseBody = await response.json();
    console.log(`User: ${user.emailId}`, responseBody);
    console.log('Response Body:', responseBody);
    expect(response.status()).toBe(200);
  }
});

})
