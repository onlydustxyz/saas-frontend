"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useMeasure } from "react-use";

import { cn } from "@/shared/helpers/cn";

import "../styles/annotation-layer.css";
import "../styles/text-layer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function InvoiceViewer({ fileUrl, className }: { fileUrl: string; className?: string }) {
  const [numPages, setNumPages] = useState(0);
  const [measureRef, { width }] = useMeasure<HTMLDivElement>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div ref={measureRef}>
      <Document className={cn("w-fit", className)} file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from(new Array(numPages), (_el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} className="mb-2" width={width} />
        ))}
      </Document>
    </div>
  );
}
