import { useEffect, useRef } from 'react';
import { useStore } from '@/store';

import * as fabric from 'fabric';

import { loadPdf, getImageByPdf } from './utils';
import './B.css';

const FABRIC_CANVAS_WIDTH = 500;
const FABRIC_CANVAS_HEIGHT = parseFloat((FABRIC_CANVAS_WIDTH * Math.sqrt(2)).toFixed(2));

const B = () => {
  const { file, selectedPageIndex } = useStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const handlePDFDownload = async () => {};

  useEffect(() => {
    if (!file || !canvasRef.current) return;

    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: FABRIC_CANVAS_WIDTH,
      height: FABRIC_CANVAS_HEIGHT,
      selection: false
    });

    (async () => {
      const { pdf } = await loadPdf(file);
      const image = await getImageByPdf(pdf, selectedPageIndex);

      const img = await fabric.FabricImage.fromURL(image!);
      const scaleX = FABRIC_CANVAS_WIDTH / img.width;
      const scaleY = FABRIC_CANVAS_HEIGHT / img.height;

      img.set({
        scaleX,
        scaleY,
        left: 0,
        top: 0,
        objectCaching: false
      });

      fabricCanvasRef.current!.backgroundImage = img;
      fabricCanvasRef.current?.requestRenderAll();
    })();

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [file, selectedPageIndex]);

  return (
    <div className="B">
      <div>
        <canvas ref={canvasRef} />

        <button type="button" onClick={handlePDFDownload}>
          PDF 다운로드
        </button>
      </div>
    </div>
  );
};

export default B;
