package com.fleetit.api;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class ApiController {
    @GetMapping("/bike/{id}/stats")
    @ResponseBody
    public String stats(@PathVariable("id") int id) {
        return String.format("hey %d", id);
    }
}
