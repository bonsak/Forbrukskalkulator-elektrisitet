import { createContext, useState, useContext, useEffect } from "react";

interface StroemData {
  id: "strømpris";
  color: string;
  data: {
    x: number;
    y: number;
  }[];
}

interface StroemForbrukData {
  id: string;
  data: any[];
}
type priser = {
  NOK_per_kWh: number;
  time_start: string;
}[];

interface DagensStroemPris {
  id: string;
  color: string;
  data: {
    x: number;
    y: number;
  }[];
}

interface StroemContextType {
  gjennomsnittsPris: number;
  setGjennomsnittsPris: (pris: number) => void;
  stroemForbruk: StroemForbrukData;
  setStroemForbruk: (stroemForbruk: StroemForbrukData) => void;
  priser: priser;
  setPriser: (priser: priser) => void;
  dagensStroemPris: DagensStroemPris | null;
  setDagensStroemPris: (pris: DagensStroemPris) => void;
  mittHus: {
    navn: string;
    antallRom: number;
    antallVoksne: number;
    antallBarn: number;
    antallKvadrat: number;
    antallVarmtvannstanker: number;
    effektVarmtvannstanker: number;
    effektElbillader: number;
  };
  setMittHus: (hus: any) => void;
  totaltForbruk: number;
  setTotaltForbruk: React.Dispatch<React.SetStateAction<number>>;
}

const StroemContext = createContext<StroemContextType | undefined>(undefined);

export const StroemProvider = ({ children }: { children: React.ReactNode }) => {
  const [totaltForbruk, setTotaltForbruk] = useState(0);
  const [gjennomsnittsPris, setGjennomsnittsPris] = useState(0);
  const [stroemForbruk, setStroemForbruk] = useState<StroemForbrukData>({
    id: "stroemforbruk",
    data: [],
  });
  const [priser, setPriser] = useState<any[]>([]);
  const [dagensStroemPris, setDagensStroemPris] =
    useState<DagensStroemPris | null>(null);
  const [mittHus, setMittHus] = useState({
    navn: "Wessels gt 4",
    antallRom: 5,
    antallVoksne: 2,
    antallBarn: 1,
    antallKvadrat: 110,
    antallVarmtvannstanker: 1,
    effektVarmtvannstanker: 2.5,
    effektElbillader: 6.5,
  });

  // useEffect(() => {
  //   setStroemForbruk(DEFAULT_DAG)
  // }, [])

  const verdier = {
    gjennomsnittsPris,
    setGjennomsnittsPris,
    stroemForbruk,
    setStroemForbruk,
    priser,
    setPriser,
    dagensStroemPris,
    setDagensStroemPris,
    mittHus,
    setMittHus,
    totaltForbruk,
    setTotaltForbruk,
  };

  return (
    <StroemContext.Provider value={verdier}>{children}</StroemContext.Provider>
  );
};

export const useStrom = () => {
  const context = useContext(StroemContext);
  if (!context) {
    throw new Error("useStrom må brukes innenfor en StromProvider");
  }
  return context;
};
