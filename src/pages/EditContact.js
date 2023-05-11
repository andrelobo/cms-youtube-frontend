import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    data_nascimento: "",
    cpf: "",
    sus: "",
    vacinas: "",
    comorbidades: "",
    bolsa_familia: "",
    peso: "",
    altura: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`https://syscam-backend.onrender.com/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`updated [${userDetails.name}] contact`);

      setUserDetails({
        name: "", address: "", email: "", phone: "",
        data_nascimento: "",
        cpf: "",
        sus: "",
        vacinas: "",
        comorbidades: "",
        bolsa_familia: "",
        peso: "",
          altura: "",
      });
      navigate("/mycontacts");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://syscam-backend.onrender.com/api/contact/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      setUserDetails({
        name: result.name,
        email: result.email,
        address: result.address,
        phone: result.phone,
        data_nascimento: result.data_nascimento,
        cpf: result.cpf,
        sus: result.sus,
        vacinas: result.vacinas,
        comorbidades: result.comorbidades,
        bolsa_familia: result.bolsa_familia,
        peso: result.peso,
        altura: result.altura
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Spinner splash="Carregando contatos..." />
      ) : (
        <>
          <h2>Edite seu contato/paciente</h2>

          <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="Joã da Silva"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressInput" className="form-label mt-4">
            Endereço
          </label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="Rua dos ricos , Cidade Nova"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="data_nascimentoInput" className="form-label mt-4">
            Data de nascimento
          </label>
          <input
            type="data_nascimento"
            className="form-control"
            id="data_nascimentoInput"
            name="data_nascimento"
            value={userDetails.data_nascimento}
            onChange={handleInputChange}
            placeholder="10/05/1973"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneInput" className="form-label mt-4">
            Telefone
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="+977 987654321"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpfInput" className="form-label mt-4">
            CPF
          </label>
          <input
            type="number"
            className="form-control"
            id="cpfInput"
            name="cpf"
            value={userDetails.cpf}
            onChange={handleInputChange}
            placeholder="61020788100"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="susInput" className="form-label mt-4">
            Nr do Sus 
          </label>
          <input
            type="number"
            className="form-control"
            id="susInput"
            name="sus"
            value={userDetails.sus}
            onChange={handleInputChange}
            placeholder="610207881007856934875"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="vacinasInput" className="form-label mt-4">
            Vacinas que tomou
          </label>
          <input
            type="string"
            className="form-control"
            id="vacinasInput"
            name="vacinas"
            value={userDetails.vacinas}
            onChange={handleInputChange}
            placeholder="Vacinas que tomou"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comorbidadesInput" className="form-label mt-4">
           Comorbidades
          </label>
          <input
            type="string"
            className="form-control"
            id="comorbidadesInput"
            name="comorbidades"
            value={userDetails.comorbidades}
            onChange={handleInputChange}
            placeholder="Comorbidades"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bolsa_familiaInput" className="form-label mt-4">
           Bolsa Familia
          </label>
          <input
            type="string"
            className="form-control"
            id="bolsa_familiaInput"
            name="bolsa_familia"
            value={userDetails.bolsa_familia}
            onChange={handleInputChange}
            placeholder="Bolsa Familia , sim ou não ?"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pesoInput" className="form-label mt-4">
           Peso
          </label>
          <input
            type="number"
            className="form-control"
            id="pesoInput"
            name="peso"
            value={userDetails.peso}
            onChange={handleInputChange}
            placeholder="Peso"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="alturaInput" className="form-label mt-4">
           Altura
          </label>
          <input
            type="number"
            className="form-control"
            id="alturaInput"
            name="altura"
            value={userDetails.altura}
            onChange={handleInputChange}
            placeholder="Altura"
            required
          />
        </div>

        <input
          type="submit"
          value="Adicionar contato"
          className="btn btn-info my-2 btn-sm rounded"
        />
      </form>
            
            
        </>
      )}
    </>
  );
};

export default EditContact;
