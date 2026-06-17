import { Rectangle, StroemForbrukData } from "@/types/types";

export const STAGE_WIDTH = 885;
export const STAGE_HEIGHT = 360;
export const GRID_COLUMNS = 24;
export const ROW_HEIGHT = 40;
export const COLUMN_WIDTH = STAGE_WIDTH / GRID_COLUMNS;
export const RESIZE_HANDLE_WIDTH = 10;
export const ROWS = Math.floor(STAGE_HEIGHT / ROW_HEIGHT);

export const snapToGrid = (x: number, width: number): { x: number; width: number } => {
  const startColumn = Math.round(x / COLUMN_WIDTH);
  const endColumn = Math.round((x + width) / COLUMN_WIDTH);
  return {
    x: startColumn * COLUMN_WIDTH,
    width: (endColumn - startColumn) * COLUMN_WIDTH,
  };
};

export const snapRectToPosition = (
  position: { x: number; y: number },
  width: number
): { x: number; y: number } => {
  const snapped = snapToGrid(position.x, width);
  return {
    x: snapped.x,
    y: Math.round(position.y / ROW_HEIGHT) * ROW_HEIGHT,
  };
};

export const beregnStroemForbruk = (brukerEnheter: Rectangle[]): StroemForbrukData => {
  const forbrukPerKolonne = new Array(GRID_COLUMNS + 1).fill(0);
  brukerEnheter.forEach((rect) => {
    const startKolonne = Math.floor(rect.x / COLUMN_WIDTH);
    const sluttKolonne = Math.ceil((rect.x + rect.width) / COLUMN_WIDTH);
    for (let i = startKolonne; i < sluttKolonne; i++) {
      if (i >= 0 && i < GRID_COLUMNS) {
        forbrukPerKolonne[i] += rect.wattage;
      }
    }
  });
  return {
    id: "stroemforbruk",
    data: forbrukPerKolonne.map((y, x) => ({ x, y })),
  };
};

export const totalForbruk = (brukerEnheter: Rectangle[]): number =>
  brukerEnheter.reduce((sum, enhet) => sum + enhet.wattage, 0);

export const beregnTotalKWh = (stroemForbruk: StroemForbrukData): number =>
  stroemForbruk.data.reduce((sum, { y: watt }) => sum + watt / 1000, 0);

export const beregnEksaktDagsPris = (
  stroemForbruk: StroemForbrukData,
  priser: Array<{ x: number; y: number }>
): number =>
  stroemForbruk.data.reduce((sum, { x, y: watt }) => {
    const timePris = priser.find((p) => p.x === x)?.y ?? 0;
    return sum + (watt * timePris) / 1000;
  }, 0);

export const beregnSesongvektetÅrsPris = (
  eksaktDagsPris: number,
  månedsnitt: number[],
  gjennomsnittsPris: number
): number => {
  if (gjennomsnittsPris === 0) return 0
  return månedsnitt.reduce(
    (sum, månedSnittPris) => sum + eksaktDagsPris * (månedSnittPris / gjennomsnittsPris) * 30,
    0
  )
}

export const isMouseOverResizeHandle = (
  mouseX: number,
  rect: Rectangle
): "left" | "right" | null => {
  if (mouseX >= rect.x && mouseX <= rect.x + RESIZE_HANDLE_WIDTH) return "left";
  if (mouseX >= rect.x + rect.width - RESIZE_HANDLE_WIDTH && mouseX <= rect.x + rect.width) return "right";
  return null;
};
