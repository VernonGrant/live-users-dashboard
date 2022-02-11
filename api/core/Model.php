<?php

namespace LiveUsers;

abstract class Model {

    public function constructFromArray($data = []) {
        // Only set's accessible class properties.
        $properties = get_object_vars($this);

        foreach($properties as $key => $value) {
            if (array_key_exists($key, $data)) {
                $this->{$key} = $data[$key];
            }
        }
    }

    abstract public function validate();

    abstract public function update();

    public function toJson() {
        return json_encode(get_object_vars($this));
    }
}
