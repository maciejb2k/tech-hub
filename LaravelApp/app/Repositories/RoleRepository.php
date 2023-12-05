<?php

namespace App\Repositories;

use App\Models\Role;

class RoleRepository {

    protected $role;

    public function __construct(Role $role)
    {
        $this->role = $role;
    }

    public function getRoleById(int $roleId)
    {
        return $this->role::where('id', $roleId)->first();
    }

}