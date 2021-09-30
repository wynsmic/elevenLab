import { useState, useEffect } from "react";
import SelectedAstronaut from "./SelectedAstronaut";

export default function SelectedAstronautContainer(props) {
  const { selectedAstronautId } = props;
  const [astronaut, setAstronaut] = useState();
  const [updateMode, setUpdateMode]=useState(false)
  const [fieldName, setFieldName] = useState();
  const [fieldAge, setFieldAge] = useState();
  const [fieldPicture, setFieldPicture] = useState();


  useEffect(() => {
    if (selectedAstronautId) fetchAstronaut()
     
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAstronautId]);

  const fetchAstronaut=()=>{
    fetch(`${process.env.REACT_APP_API_URL}/astronaut/${selectedAstronautId}`)
    .then((response) => {
      if (response.status === 500) throw new Error("Something went wrong.");
      else return response.json();
    })
    .then((data) =>{
       setAstronaut(data)
       setFieldAge(data.age)
       setFieldName(data.name)
       setFieldPicture(data.picture_url)
      })
    .catch((err) => console.error(err));
  }

  const update = () => {
    const updatedAstronaut = {
      name: fieldName,
      age: fieldAge,
      picture_url: fieldPicture,
    };
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer oneJWT`,
      },
      body: JSON.stringify(updatedAstronaut),
    };
    fetch(`${process.env.REACT_APP_API_URL}/astronaut/${selectedAstronautId}`, requestOptions)
      .then((response) => {
        if (response.status !== 200) throw response.json();
        else return response.json();
      })
      .then(() => {
        window.alert("Astronaut has been created !");
        setFieldName("");
        setFieldAge("");
        setFieldPicture("");
        setUpdateMode(false)
        fetchAstronaut(selectedAstronautId);
      })
      .catch((err) => {
        err.then((err=>
          window.alert(err?.message?.message || "Server failed creating astronaut :/")
        ))
      })  
  };

  const deleteOne=()=>{
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer oneJWT`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/astronaut/${selectedAstronautId}`, requestOptions )
    .then((response) => {
      if (response.status === 500) throw new Error("Something went wrong.");
      else return response.json();
    })
    .then((data) =>{
       setAstronaut(data)
       setFieldAge(data.age)
       setFieldName(data.name)
       setFieldPicture(data.picture_url)
      })
    .catch((err) => console.error(err));
  }

  return (
    <SelectedAstronaut
      astronaut={astronaut}
      deleteOne={deleteOne}
      updateMode={updateMode} 
      setUpdateMode={setUpdateMode}
      handleUpdate={update}
      fieldAge={fieldAge}
      setFieldAge={setFieldAge}
      fieldName={fieldName}
      setFieldName={setFieldName}
      fieldPicture={fieldPicture}
      setFieldPicture={setFieldPicture}
    />
  );
}
