"use client";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../style.css';

export default function ProjectSpecificationTable({ specifications = [], status }) {
  const bungalowSpecs = specifications.filter((spec) =>
    ["Bunglows/Villa/Row House"].includes(spec.subType)
  );
  const otherSpecs = specifications.filter(
    (spec) => !["Bunglows/Villa/Row House"].includes(spec.subType)
  );

  
  const sizeTemplate = (rowData) =>
    `${rowData.size || "-"} ${rowData.measurementUnit || ""}`;

  const constructionAreaTemplate = (rowData) =>
    `${rowData.constructionAreaSize || "-"} ${rowData.measurementUnit || ""}`;

  const formatToIndianUnits = (num) => {
    if (num >= 1e7) {
      return `${(num / 1e7).toFixed(2)} Cr`;
    } else if (num >= 1e5) {
      return `${(num / 1e5).toFixed(2)} Lac`;
    } else {
      return num.toLocaleString('en-IN');
    }
  };

const priceTemplate = (rowData) => {
  if (!rowData.price || rowData.price <= 0) {
    return <span className="text-gray-700 italic">On Request</span>;
  }

  return (
    <span className="text-gray-700 ">
      ₹ {formatToIndianUnits(Number(rowData.price))}
    </span>
  );
};

const dateTemplate = (rowData) => {
  if (!rowData.possessionDate || rowData.status === "Ready to Move") {
    return <span className="text-gray-700 italic">Ready To Move</span>;
  }
  const date = new Date(rowData.possessionDate);
  return (
    <span className="text-gray-700">
      {date.toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric'
      })}
    </span>
  )
}



  return (
    <div className="overflow-x-auto mt-6 space-y-10">
      <h2 className="text-xl font-bold mb-4">Project Specifications</h2>

      {/* Table for other types */}
      {otherSpecs.length > 0 && (
        <>
          <DataTable value={otherSpecs} className="text-sm" showGridlines>
            <Column field="unitType" header="Units"></Column>
            <Column field="subType" header="Type"></Column>
            <Column field="area" header="Area"></Column>
            <Column header="Size" body={sizeTemplate}></Column>
            <Column header="Possession" body={dateTemplate}></Column>
            <Column header="Price" body={priceTemplate}></Column>
          </DataTable>
        </>
      )}

      {/* Table for Bunglows / Villa / Row House */}
      {bungalowSpecs.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Bungalows / Villas / Row Houses</h3>
          <DataTable value={bungalowSpecs} className="text-sm" showGridlines>
            <Column field="unitType" header="Units"></Column>
            <Column field="area" header="Area"></Column>
            <Column header="Land Size" body={sizeTemplate}></Column>
            <Column header="Constr. Size" body={constructionAreaTemplate}></Column>
            <Column header="Possession" body={dateTemplate}></Column>
            <Column header="Price" body={priceTemplate}></Column>
          </DataTable>
        </div>
      )}
    </div>
  );
}

