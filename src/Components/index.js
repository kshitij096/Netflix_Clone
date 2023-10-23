import { useEffect, useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import requests from "../Request";
import toast1 from "react-toastify/dist/ReactToastify.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { UserAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Movie from "./Movie";
import Main from "../Components/Main";
import Row from "../Components/Row";

export {
  useEffect,
  useState,
  Navigate,
  useNavigate,
  Link,
  axios,
  requests,
  toast1,
  Youtube,
  movieTrailer,
  Button,
  Modal,
  UserAuth,
  ToastContainer,
  toast,
  arrayUnion,
  doc,
  updateDoc,
  onSnapshot,
  db,
  Movie,
  Main,
  Row,
};
