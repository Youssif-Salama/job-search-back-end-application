export const companyEmailTemplate = (emailToken) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #666;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Confirmation</h2>
            <p>please click the button below:</p>
            <p>
                <a href="http://localhost:10000/api/v1/company/verify/${emailToken}" class="btn">Confirm Email</a>
            </p>
            <p>If you did not add company for our service, please disregard this email.</p>
            <p>Best regards,<br>Job Search</p>
        </div>
    </body>
    </html>
    
    `
};
export const emailTemplate = (emailToken) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #666;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Confirmation</h2>
            <p>please click the button below:</p>
            <p>
                <a href="http://localhost:10000/api/v1/user/verify/${emailToken}" class="btn">Confirm Email</a>
            </p>
            <p>If you did not sign up for our service, please disregard this email.</p>
            <p>Best regards,<br>Job Search</p>
        </div>
    </body>
    </html>
    
    `
};
export const resetTemplate = (resetPasswordToken) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f9f9f9;
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #666;
            }
    
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Confirmation</h2>
            <p>please click the button below:</p>
            <p>
                <a href="http://localhost:10000/api/v1/user/reset/password/${resetPasswordToken}" class="btn">Reset Password</a>
            </p>
            <p>Best regards,<br>Job Search</p>
        </div>
    </body>
    </html>
    
    `
};

export const successConfirmation = `
<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
    
        .confirmation-container {
          text-align: center;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #1D4ED8;
        }
    
        p {
          color: #333333;
        }
      </style>
    </head>
    <body>
      <div class="confirmation-container">
        <h1>Your Account was Successfully Confirmed</h1>
        <p>Thank you for confirming your account. You can now access our services.</p>
        <p>back to <a href="http://localhost:3000/login">login</a></p>
      </div>
    </body>
    </html>`
export const successResetPasswordConfirmation = `
<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
    
        .confirmation-container {
          text-align: center;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #1D4ED8;
        }
    
        p {
          color: #333333;
        }
      </style>
    </head>
    <body>
      <div class="confirmation-container">
        <p>password reset successfully</p>
      </div>
    </body>
    </html>`