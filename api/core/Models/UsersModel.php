<?php

namespace LiveUsers\Models;

use LiveUsers\Model;

class UsersModel extends Model {

    // NOTE: To save time, I just made them all public.
    public $email = '';
    public $name = '';
    public $entranceTime;
    public $updatedTime;
    public $ipAddress;
    public $agent;
    public $visitCount = 0;
    public $online = false;

    public function validate() {
        $success = true;

        // Check if email is valid.
        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) $success = false;

        // Check if name is long enough.
        if (!strlen($this->name) > 3) $success = false;

        return $success;
    }

    public function constructFromArray($data = []) {
        parent::constructFromArray($data);

        // Set object properties from users data record, if exists.
        $users = $this->getUsersData();
        foreach($users as $user) {
            if ($user->email == $this->email) {
                // TODO: what if the user is already logged in?
                $this->visitCount = $user->visitCount;
                $this->entranceTime = $user->entranceTime;
                $this->updatedTime = $user->updatedTime;
            }
        }
    }

    public function onEntrance() {
        $this->entranceTime = time();
        $this->ipAddress = $_SERVER['REMOTE_ADDR'];
        $this->agent = $_SERVER['HTTP_USER_AGENT']??null;
        $this->visitCount += 1;
        $this->online = true;
    }

    public function update() {
        $users = $this->getUsersData();

        // Find users and update information.
        foreach($users as &$user) {
            if ($user->email == $this->email) {
                $this->updatedTime = time();
                $user = (object) get_object_vars($this);
                file_put_contents(DATA_FILE_PATH, json_encode($users));
                return;
            }
        }

        // Users does not exist, add them.
        $this->updatedTime = time();
        array_push($users, get_object_vars($this));
        file_put_contents(DATA_FILE_PATH, json_encode($users));
    }

    private function getUsersData() {
        // Create file if it doesn't exist.
        if (!file_exists(DATA_FILE_PATH)) {
            touch(DATA_FILE_PATH);
        }

        // Get file content.
        $usersData = file_get_contents(DATA_FILE_PATH);
        $usersData = json_decode($usersData);

        // No previous data
        if ($usersData === NULL) {
            return [];
        }

        return $usersData;
    }
}
