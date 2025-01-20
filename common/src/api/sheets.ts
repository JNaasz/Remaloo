import { SheetData } from '../types/globals';
const baseURL = 'http://localhost:2000';
// const baseURL = 'https://jensthing.schwaasz.com/sheet-data';

/**
 * sends a request to the server to fetch sheet data
 * @param {string | null} sheetRange
 * @returns {SheetData}
 */
export async function getSheetData(sheetRange: string | null): Promise<SheetData> {
  try {
    let url = `${baseURL}/sheet-data`;
    if (sheetRange) {
      url += `/${sheetRange}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const resJson: SheetData = await response.json();
    return resJson;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow error if needed
  }
}

/**
 * send sheet item data to server as post request to add item to sheet
 * @param {SheetItem} sheetItem
 * @returns {PostResponse}
 */
export async function setSheetData(sheetItem: SheetItem): Promise<PostResponse> {
  try {
    let url = `${baseURL}/update-sheet-data`;

    const response = await fetch(url, {
      body: JSON.stringify({ data: sheetItem }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const resJson: PostResponse = await response.json();
    console.log('no error making post request, response', resJson);
    return resJson;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow error if needed
  }
}
