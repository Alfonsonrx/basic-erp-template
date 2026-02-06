import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "@components/ui/Card";
import { 
  Shield, 
  Users, 
  CheckCircle,
  XCircle,
  Search,
  Save,
  RotateCcw,
  UserCog,
  AlertTriangle
} from "lucide-react";
import { PrimaryButton } from "@components/Buttons";
import { 
  ROLE_PERMISSIONS, 
  type Permission,
  setPermissions,
  loadPermissionsFromRole 
} from "@reduxStore/permissions/permissionsSlice";
import type { RootState } from "@types";

// Permission categories for organized display
const PERMISSION_CATEGORIES = {
  "Users": ["users:view", "users:create", "users:edit", "users:delete"],
  "Customers": ["customers:view", "customers:create", "customers:edit", "customers:delete"],
  "Projects": ["projects:view", "projects:create", "projects:edit", "projects:delete"],
  "Team": ["team:view", "team:create", "team:edit", "team:delete"],
  "Inventory": ["inventory:view", "inventory:create", "inventory:edit", "inventory:delete"],
  "Appointments": ["appointments:view", "appointments:create", "appointments:edit", "appointments:delete"],
  "Billing": ["billing:view", "billing:manage"],
  "Settings": ["settings:view", "settings:manage"],
  "Admin": ["admin:access", "admin:permissions", "admin:audit"],
};

// Mock users data
const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin", active: true },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "manager", active: true },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "employee", active: true },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "employee", active: false },
];

export default function Permissions() {
  const dispatch = useDispatch();
  const { role: currentRole, permissions: currentPermissions } = useSelector(
    (state: RootState) => state.permissions
  );
  
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");
  const [editedPermissions, setEditedPermissions] = useState<Permission[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const selectedUserData = mockUsers.find(u => u.id === selectedUser);

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      const perms = ROLE_PERMISSIONS[user.role] || [];
      setEditedPermissions([...perms]);
      setHasChanges(false);
    }
  };

  const togglePermission = (permission: Permission) => {
    setEditedPermissions(prev => {
      const newPerms = prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission];
      setHasChanges(true);
      return newPerms;
    });
  };

  const handleSave = () => {
    // In real app, this would call API to update user permissions
    console.log("Saving permissions:", { userId: selectedUser, permissions: editedPermissions });
    setHasChanges(false);
  };

  const handleReset = () => {
    if (selectedUserData) {
      setEditedPermissions([...ROLE_PERMISSIONS[selectedUserData.role]]);
      setHasChanges(false);
    }
  };

  const filteredUsers = mockUsers.filter(
    user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Permissions Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage user roles and permissions across the system
          </p>
        </div>
        {hasChanges && (
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <PrimaryButton onClick={handleSave}>
              <Save className="w-4 h-4" />
              Save Changes
            </PrimaryButton>
          </div>
        )}
      </div>

      {/* Warning Banner */}
      <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 rounded-lg">
        <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Admin Access Required:</strong> Changes to permissions take effect immediately and can affect system access.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "users"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Users
          </span>
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "roles"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="flex items-center gap-2">
            <UserCog className="w-4 h-4" />
            Role Templates
          </span>
        </button>
      </div>

      {activeTab === "users" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User List */}
          <Card title="Users" icon={<Users className="w-5 h-5" />} classname="lg:col-span-1">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserSelect(user.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    selectedUser === user.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-medium">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : user.role === "manager"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}>
                      {user.role}
                    </span>
                    {!user.active && (
                      <span className="text-xs text-muted-foreground">Inactive</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Permissions Editor */}
          <Card 
            title={selectedUserData ? `Permissions: ${selectedUserData.name}` : "Permissions"} 
            icon={<Shield className="w-5 h-5" />} 
            classname="lg:col-span-2"
          >
            {selectedUser ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Base Role</p>
                    <p className="font-medium capitalize">{selectedUserData?.role}</p>
                  </div>
                  <select
                    value={selectedUserData?.role}
                    onChange={(e) => {
                      // In real app, this would update the user's role
                      dispatch(loadPermissionsFromRole(e.target.value));
                    }}
                    className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {Object.entries(PERMISSION_CATEGORIES).map(([category, permissions]) => (
                    <div key={category} className="border border-border rounded-lg p-4">
                      <h4 className="font-medium mb-3">{category}</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                          <label
                            key={permission}
                            className="flex items-center gap-2 p-2 rounded hover:bg-secondary/50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={editedPermissions.includes(permission as Permission)}
                              onChange={() => togglePermission(permission as Permission)}
                              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <span className="text-sm capitalize">
                              {permission.split(":")[1]}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="mx-auto h-12 w-12 mb-3 opacity-50" />
                <p>Select a user to manage their permissions</p>
              </div>
            )}
          </Card>
        </div>
      ) : (
        /* Role Templates Tab */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(ROLE_PERMISSIONS).map(([roleName, permissions]) => (
            <Card 
              key={roleName} 
              title={roleName.charAt(0).toUpperCase() + roleName.slice(1)} 
              icon={<UserCog className="w-5 h-5" />}
            >
              <p className="text-sm text-muted-foreground mb-4">
                {roleName === "admin" && "Full system access with all permissions"}
                {roleName === "manager" && "Can manage teams and most resources"}
                {roleName === "employee" && "Standard user with limited access"}
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {permissions.map((perm) => (
                  <div key={perm} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="capitalize">{perm.replace(":", " - ")}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {permissions.length} permissions granted
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
