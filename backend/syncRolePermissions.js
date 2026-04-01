const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const LEGACY_PERMISSION_MAP = {
  manage_holidays: ['create_holidays', 'view_holidays'],
  manage_roles: ['view_roles', 'create_role', 'edit_role', 'delete_role']
};

function normalizePermissions(permissions = []) {
  const normalized = new Set();

  for (const permission of permissions) {
    if (LEGACY_PERMISSION_MAP[permission]) {
      LEGACY_PERMISSION_MAP[permission].forEach((mappedPermission) => normalized.add(mappedPermission));
    } else {
      normalized.add(permission);
    }
  }

  return Array.from(normalized);
}

async function syncRolePermissions() {
  try {
    console.log('Starting role permission sync...');

    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true,
        permissions: true
      }
    });

    if (roles.length === 0) {
      console.log('No roles found. Nothing to update.');
      return;
    }

    let updatedCount = 0;

    for (const role of roles) {
      const before = role.permissions || [];
      const after = normalizePermissions(before);

      const isDifferent = before.length !== after.length || before.some((p, idx) => p !== after[idx]);

      if (!isDifferent) {
        continue;
      }

      await prisma.role.update({
        where: { id: role.id },
        data: { permissions: after }
      });

      updatedCount += 1;
      console.log('Updated role:', role.name);
      console.log('  before:', before);
      console.log('  after :', after);
    }

    console.log(`Sync complete. Updated ${updatedCount} role(s).`);
  } catch (error) {
    console.error('Error syncing role permissions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncRolePermissions();
