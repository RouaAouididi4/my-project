import React from "react";
import ManageClients from "../sections/ManageClients";
import ManageProperties from "../sections/ManageProperties";
import ModifyProperty from "../sections/ModifyProperty";
import ArchiveProperty from "../sections/ArchiveProperty";
import ViewClientHistory from "../sections/ViewClientHistory";

const AgentDashboard = () => {
  return (
    <div>
      <h1>Agent Dashboard</h1>

      <section>
        <h2>Gestion des Clients</h2>
        <ManageClients />
      </section>

      <section>
        <h2>Ajouter une Propriété</h2>
        <ManageProperties />
      </section>

      <section>
        <h2>Modifier une Propriété</h2>
        <ModifyProperty />
      </section>

      <section>
        <h2>Archiver une Propriété</h2>
        <ArchiveProperty />
      </section>

      <section>
        <h2>Historique des Clients</h2>
        <ViewClientHistory />
      </section>
    </div>
  );
};

export default AgentDashboard;
