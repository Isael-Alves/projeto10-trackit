import styled from "styled-components";
import * as dayjs from 'dayjs';
import { FaCheck } from "react-icons/fa";
import Navbar from "../Navbar";
import Footer from "../Footer/Footer";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../providers/auth";

export default function Today() {
  const {dados, setScreen} = React.useContext(AuthContext); 
  const {token} = dados;
  const [habitsToday, setHabitsToday] = useState([]);
  setScreen("hoje");

  useEffect(() => {
    const config = {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    };

    const promise = axios.get(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today`,
      config
    );

    promise.then((res) => {
      setHabitsToday(res.data);
      console.log(res.data);
    });

    promise.catch((err) => {
      const message = err.response.statusText;
      alert(message);
    });

  }, []);


  function StructuringHabits() {
    if (habitsToday.length > 0) {
      return habitsToday.map((habit) => {
        const { id, name, done, currentSequence, highestSequence } = habit;
        return (
          <li key={id} id={id} >
            <section>
              <h3>{name}</h3>
              <h4>Sequência atual: {currentSequence} dia(s)</h4>
              <h4>Seu recorde: {highestSequence} dias</h4>
            </section>
            <div done={done}>
              <FaCheck />
            </div>
          </li>
        );
      });
    }
    return <h1>Nenhum hábito para hoje</h1>
  }

function todayDay(){
  const today = dayjs();
  const day = today.date();
  const month = today.month();
  console.log(today);
  return `Segunda, ${day}/${month}`
}

  return (
    <>
      <Navbar />
      <Container>
        <Title>
          <h1>{todayDay()}</h1>
          <h2>Nenhum hábito concluído ainda</h2>
        </Title>
        <Habits>{StructuringHabits()}</Habits>
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.nav`
  background-color: #f2f2f2;
  width: 100%;
  height: 100vh;
  padding: 16px;
`;

const Title = styled.header`
  margin-top: 90px;
  margin-bottom: 20px;
  h1 {
    font-weight: 400;
    font-size: 23px;
    line-height: 29px;

    color: #126ba5;
  }
  h2 {
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;

    color: #bababa;
  }
`;

const Habits = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    width: 340px;
    height: 94px;
    padding: 15px;
    margin-bottom: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: #ffffff;
    border-radius: 5px;

    h3 {
      margin-bottom: 7px;
      font-weight: 400;
      font-size: 20px;
      line-height: 25px;

      color: #666666;
    }

    h4 {
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;

      color: #666666;
    }

    div {
      width: 69px;
      height: 69px;

      display: flex;
      align-items: center;
      justify-content: center;

      background: ${(props)=> props.done ? '#8FC549' : '#EBEBEB'};
      border: 1px solid #e7e7e7;
      border-radius: 5px;

      svg {
        width: 35px;
        height: 28px;
        color: #ffffff;
      }
    }
  }
`;
