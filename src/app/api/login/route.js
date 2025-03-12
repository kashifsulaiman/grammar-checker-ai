

export async function POST(req) {
  try {
    const testPassword = '123456';
    const testEmail = 'test@gmail.com';
    const body = await req.json();

    if(body.email  === testEmail && body.password === testPassword){
        return Response.json({ success: true, body, message: 'Login Successful'});
    }
    else{
        return Response.json({ success: false, message: 'Credentials not matched'});
    }

  } catch (error) {
    return Response.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
