import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [nice, setNice] = useState(false);

  const affichage = [
    {
      label: "Name",
      id: "Name",
      placeholder: "Enter your name",
      textArea: false,
      type: "text",
      function: setName,
      regex: /^[a-zA-Z0-9,.!? ]+$/,
    },
    {
      label: "Email",
      id: "email",
      placeholder: "Enter your E-mail",
      textArea: false,
      type: "email",
      function: setEmail,
      regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    },
    {
      label: "Your message",
      textArea: true,
      function: setMessage,
      regex: /^[a-zA-Z0-9,.!? ]+$/,
      id: "message",
    },
  ];

  useEffect(() => {
    // Hide the success message after 2 seconds (when nice becomes true)
    if (nice) {
      const hideTimer = setTimeout(() => {
        setNice(false);
      }, 2000);

      // Clear the timer when the success message is hidden
      return () => clearTimeout(hideTimer);
    }
  }, [nice]);

  function verifyInput(value, regex) {
    return value === "" || !regex.test(value);
  }

  function verifyAllInputs() {
    return affichage.every((item) => !verifyInput(item.function, item.regex));
  }

  function emptyFields() {
    affichage.forEach((item) => item.function(""));
  }

  return (
    <Grid >
      <section className="text-black">
        <div style={{ padding: "2rem" }}>
          <Typography variant="h4" gutterBottom>
            Let's get in touch
          </Typography>
          {nice && (
            <Typography variant="body2" color="success" gutterBottom>
              Your message is sent successfully
            </Typography>
          )}
          <form style={{ marginTop: "2rem" }}>
            {affichage.map((dis, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <label htmlFor={dis.id} style={{ marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
                  {dis.label}
                </label>
                {dis.textArea === false ? (
                  <TextField
                    type={dis.type}
                    id={dis.id}
                    label={dis.label}
                    placeholder={dis.placeholder}
                    value={dis.function}
                    onChange={(e) => dis.function(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    error={verifyInput(dis.function, dis.regex)}
                    helperText={verifyInput(dis.function, dis.regex) ? `${dis.label} is invalid` : ""}
                  />
                ) : (
                  <TextField
                    id={dis.id}
                    label={dis.label}
                    placeholder={dis.placeholder}
                    value={dis.function}
                    onChange={(e) => dis.function(e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    error={verifyInput(dis.function, dis.regex)}
                    helperText={verifyInput(dis.function, dis.regex) ? `${dis.label} is invalid` : ""}
                    multiline
                    rows={4}
                  />
                )}
              </div>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={(e) => {
                e.preventDefault();
                if (verifyAllInputs()) {
                  setNice(true);
                  emptyFields();
                }
              }}
              style={{ marginTop: "1rem" }}
            >
              Send message
            </Button>
          </form>
        </div>
      </section>
    </Grid>
  );
}
