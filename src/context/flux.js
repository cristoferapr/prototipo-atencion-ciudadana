const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      comments: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      syncTokenFromStore: () => {
        const token = sessionStorage.getItem("token");
        console.log("App just loaded, synching the session storage token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        const token = sessionStorage.removeItem("token");
        console.log("Logging out");
        setStore({ token: null });
      },

      submitComment: async (data) => {
        const store = getStore();
        const token = store.token; // Obtén el token almacenado

        try {
          const response = await fetch("http://localhost:5000/api/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Envía el token en el encabezado
            },
            body: JSON.stringify({
              category: data.category,
              comment: data.comment,
              latitude: data.location.lat,
              longitude: data.location.lng,
              address: data.manualAddress,
              files: data.files.map((file) => file.name),
            }),
          });

          if (response.ok) {
            const result = await response.json();
            alert("Comentario enviado exitosamente: " + result.data.id);
          } else {
            const error = await response.json();
            alert("Error: " + error.message);
          }
        } catch (error) {
          console.error("Error al enviar el comentario:", error);
          alert("Error al enviar el comentario.");
        }
      },

      fetchComments: async () => {
        try {
          const response = await fetch("http://localhost:5000/api/allcomments");
          if (!response.ok) throw new Error("Error fetching comments");

          const data = await response.json();
          const formattedComments = data.data.map((comment) => ({
            id: comment.id,
            date: new Date(comment.created_at).toLocaleDateString(),
            status: "Pendiente",
            category: comment.category,
            description: comment.comment,
            rut: comment.user_rut,
            latitude: comment.latitude,
            longitude: comment.longitude,
            address: comment.address,
            files: comment.files,
          }));

          setStore({ comments: formattedComments });
        } catch (error) {
          console.error("Error al cargar los comentarios:", error);
        }
      },

      login: async (rut, password) => {
        const opts = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rut: rut,
            password: password,
          }),
        };
        try {
          const resp = await fetch("http://localhost:5000/api/login", opts);
          if (resp.status !== 200) {
            alert("There has been some error");
            return false;
          }
          const data = await resp.json();
          console.log("this came from the backend", data);

          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });

          return true;
        } catch (error) {
          console.error("There was an error login in!");
        }
      },
    },
  };
};

export default getState;
