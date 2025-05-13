import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [agentRequests, setAgentRequests] = useState([]);
  const [properties, setProperties] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchClients();
    fetchAgentRequests();
    fetchProperties();
    fetchClientHistory();
  }, []);

  const fetchClients = async () => {
    setClients([
      { id: 1, name: "Ali", email: "ali@mail.com" },
      { id: 2, name: "Sarra", email: "sarra@mail.com" },
    ]);
  };

  const fetchAgentRequests = async () => {
    setAgentRequests([{ id: 3, name: "Ahmed", email: "ahmed@mail.com" }]);
  };

  const fetchProperties = async () => {
    setProperties([
      { id: 1, title: "Villa S+3", status: "active" },
      { id: 2, title: "Studio Meublé", status: "archived" },
    ]);
  };

  const fetchClientHistory = async () => {
    setHistory([{ client: "Ali", actions: "Reserved property on 01/05/2025" }]);
  };

  const deleteUser = (id) => {
    setClients((prev) => prev.filter((user) => user.id !== id));
  };

  const approveAgent = (id) => {
    setAgentRequests((prev) => prev.filter((user) => user.id !== id));
  };

  const archiveProperty = (id) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "archived" } : p))
    );
  };

  const modifyProperty = (id) => {
    alert(`Redirect to edit page for property ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <Tabs defaultValue="agents" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="agents">Manage Agents</TabsTrigger>
          <TabsTrigger value="clients">Manage Clients</TabsTrigger>
          <TabsTrigger value="history">Client History</TabsTrigger>
          <TabsTrigger value="properties">Manage Properties</TabsTrigger>
        </TabsList>

        {/* Agent Requests */}
        <TabsContent value="agents">
          <div className="mt-4 space-y-4">
            {agentRequests.map((agent) => (
              <Card key={agent.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium">{agent.name}</p>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                  </div>
                  <div className="space-x-2">
                    <Button onClick={() => approveAgent(agent.id)}>
                      Accepter
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteUser(agent.id)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Clients */}
        <TabsContent value="clients">
          <div className="mt-4 space-y-4">
            {clients.map((client) => (
              <Card key={client.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() => deleteUser(client.id)}
                  >
                    Supprimer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* History */}
        <TabsContent value="history">
          <div className="mt-4 space-y-4">
            {history.map((h, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p>
                    <strong>{h.client}</strong> – {h.actions}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Properties */}
        <TabsContent value="properties">
          <div className="mt-4 space-y-4">
            {properties.map((property) => (
              <Card key={property.id}>
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <p className="font-medium">{property.title}</p>
                    <p className="text-sm text-gray-500">
                      Status: {property.status}
                    </p>
                  </div>
                  <div className="space-x-2">
                    <Button onClick={() => modifyProperty(property.id)}>
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => archiveProperty(property.id)}
                    >
                      Archiver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
