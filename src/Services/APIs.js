import {BASE_URL} from '../Constants/BaseUrls';

export async function ApiCallWithoutToken({route, verb, body}) {
  try {
    const response = await fetch(`${BASE_URL}/${route}`, {
      method: verb,
      body: body,
    });

    if (response.ok) {
      // API call was successful
      const responseData = await response.json();
      return responseData;
    } else {
      // API call failed
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    // Handle any network-related errors
    console.error('Error in API WIthout Token::>>:', error);
  }
}

export async function ApiCallWithToken({route, verb, body, token}) {
  try {
    const response = await fetch(`${BASE_URL}/${route}`, {
      method: verb,
      body: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      // API call was successful

      const responseData = await response.json();
      const modify = {status: response.status, ...responseData};
      return modify;
    } else {
      // API call failed
      const errorData = await response.json();
      console.log('errorData in ApiCallWithToken: ', errorData);
      return errorData;
    }
  } catch (error) {
    // Handle any network-related errors
    console.error('Error In API with token::>>:', error);
  }
}
