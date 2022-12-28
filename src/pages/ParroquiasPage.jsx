import React, { useEffect, useRef, useState } from "react";
import { Checking } from "../components/Checking";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

import "../styles/tablePrime.css";
import { useNavigate, useParams } from "react-router-dom";
import { getAllParroquiasByCantonId } from "../helpers/parroquia/getAllParroquiasByCantonId";
import { postParroquia } from "../helpers/parroquia/postParroquia";
import { putParroquia } from "../helpers/parroquia/putParroquia";
import { deleteParroquia } from "../helpers/parroquia/deleteParroquia";

let emptyParroquia = {
  name: "",
  description: "",
  cantonId:"",
};

export const ParroquiasPage = () => {
  const [provincias, setProvincias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [provinciaDialog, setProvinciaDialog] = useState(false);
  const [deleteProvinciaDialog, setDeleteProvinciaDialog] = useState(false);
  const [deleteProvinciasDialog, setDeleteProvinciasDialog] = useState(false);
  const [provincia, setProvincia] = useState(emptyParroquia);
  const [selectedProvincias, setSelectProvincias] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const params =  useParams();
  const navigate = useNavigate()


  useEffect(() => {
    getParroquias();
  }, []);


  const createProvincia = async (provincia)=>{
    const responsePostProvincia = await Promise.resolve(postParroquia(provincia));
    return responsePostProvincia;
  }

  const updateProvincia = async (provincia)=>{
    const responsePutProvincia = await Promise.resolve(putParroquia(provincia));
    return responsePutProvincia;
  }

  const removeProvincia = async (provinciaId)=>{
    console.log(provinciaId)
    const responseDeleteProvincia = await Promise.resolve(deleteParroquia(provinciaId));
    return responseDeleteProvincia;
  }

  const getParroquias = async () => {
    const responseProvinces = await Promise.resolve(getAllParroquiasByCantonId(params.cantonId));
    if(responseProvinces!=null){
      setProvincias(responseProvinces);
      setIsLoading(false);
    }
    setIsLoading(false)
  };


  const openNew = () => {
    setProvincia(emptyParroquia);
    setSubmitted(false);
    setProvinciaDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProvinciaDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProvinciaDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProvinciasDialog(false);
  };
  const saveProduct = async () => {
    setSubmitted(true);

    if (provincia.name.trim()) {
      let _provincias = [...provincias];
      let _provincia = { ...provincia };
      if (provincia.id) {
        const responsePutProvincia =  updateProvincia(_provincia)
        if(responsePutProvincia!=null){
          const index = findIndexById(provincia.id);
          _provincias[index] = _provincia;
          toast.current.show({
            severity: "success",
            summary: "Genial!",
            detail: "Parroquia actualizada",
            life: 3000,
          });
        }
        else{
          toast.current.show({
            severity: "error",
            summary: "Algo salio mal!",
            detail: "No se pudo actualizar la parroquia",
            life: 3000,
          }); 
        }
      } else {
        _provincia.cantonId = params.cantonId
        const responsePostProvincia = await createProvincia(_provincia)
        if(responsePostProvincia){
          _provincia.id = responsePostProvincia.id;
          _provincia.image = "provincia-placeholder.svg";
          _provincias.push(_provincia);
          toast.current.show({
            severity: "success",
            summary: "Genial!",
            detail: "Parroquia creada",
            life: 3000,
          });
        }
        else{
          toast.current.show({
            severity: "error",
            summary: "Algo salio mal!",
            detail: "No se pudo crear la parroquia",
            life: 3000,
          });
        }
      }

      setProvincias(_provincias);
      setProvinciaDialog(false);
      setProvincia(emptyParroquia);
    }
  };

  const editProduct = (provincia) => {
    setProvincia({ ...provincia });
    setProvinciaDialog(true);
  };

  const confirmDeleteProduct = (provincia) => {
    setProvincia(provincia);
    setDeleteProvinciaDialog(true);
  };

  const deleteProvinciaView = () => {
    const responseDeleteProvincia = removeProvincia(provincia.id)
    if(responseDeleteProvincia){
      let _provincias = provincias.filter((val) => val.id !== provincia.id);
      setProvincias(_provincias);
      setDeleteProvinciaDialog(false);
      setProvincia(emptyParroquia);
      toast.current.show({
        severity: "success",
        summary: "Eliminado!",
        detail: "Parroquia eliminada",
        life: 3000,
      });
    }
    else{
      toast.current.show({
        severity: "error",
        summary: "Algo salio mal!",
        detail: "No se pudo eliminar la parroquia",
        life: 3000,
      });
    }
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < provincias.length; i++) {
      if (provincias[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

   const confirmDeleteSelected = () => {
    setDeleteProvinciasDialog(true);
  };

  const deleteSelectedProvincias = () => {
    let _provincias = provincias.filter(
      (val) => !selectedProvincias.includes(val)
    );
    setProvincias(_provincias);
    setDeleteProvinciasDialog(false);
    setSelectProvincias(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Products Deleted",
      life: 3000,
    });
  };


  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _provincia = { ...provincia };
    _provincia[`${name}`] = val;

    setProvincia(_provincia);
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <Button
          label="Volver"
          icon="pi pi-arrow-left"
          className="p-button-info mr-2"
          onClick={()=>navigate(-1)}
        />
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
        <>
        <Button
          label="Añadir"
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedProvincias || !selectedProvincias.length}
        />
        </>
    )
  } 

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Administrar parroquias</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
  const provinciaDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </>
  );
  const deleteProvinciaDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteProvinciaView}
      />
    </>
  );
  const deleteProvinciasDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedProvincias}
      />
    </>
  );

  return isLoading ? (
    <Checking />
  ) : (
    <div className="datatable-crud-demo">
      <Toast ref={toast} />

      <div className="card">
        <Toolbar
          className="mb-4"
          left={leftToolbarTemplate}
          right={rightToolbarTemplate}
        ></Toolbar>

        <DataTable
          ref={dt}
          value={provincias}
          selection={selectedProvincias}
          onSelectionChange={(e) => setSelectProvincias(e.value)}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="{first} - {last} de {totalRecords} parroquias"
          globalFilter={globalFilter}
          header={header}
          responsiveLayout="scroll"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
            exportable={false}
          ></Column>
          <Column
            field="id"
            header="Id"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="name"
            header="Parroquia"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="description"
            header="Descripcion"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="createAt"
            header="Fecha de creación"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </div>

      <Dialog
        visible={provinciaDialog}
        style={{ width: "450px" }}
        header="Información de la parroquia"
        modal
        className="p-fluid"
        footer={provinciaDialogFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={provincia.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !provincia.name })}
          />
          {submitted && !provincia.name && (
            <small className="p-error">El nombre es obligatorio.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="description">Descripción</label>
          <InputTextarea
            id="description"
            value={provincia.description}
            onChange={(e) => onInputChange(e, "description")}
            required
            rows={3}
            cols={20}
            className={classNames({ "p-invalid": submitted && !provincia.description })}
          />
          {submitted && !provincia.description && (
            <small className="p-error">La descripción es obligatoria.</small>
          )}
        </div>

      </Dialog>

      <Dialog
        visible={deleteProvinciaDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProvinciaDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {provincia && (
            <span>
              Estas seguro que quiere eliminar: <b>{provincia.name}</b>?
            </span>
          )}
        </div>
      </Dialog>

      <Dialog
        visible={deleteProvinciasDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={deleteProvinciasDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className="confirmation-content">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          {provincia && (
            <span>Estas seguro que deseas eliminar los cantones seleccionadas?</span>
          )}
        </div>
      </Dialog>
    </div>
  );
};
