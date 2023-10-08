package com.ticketez_backend_springboot.service;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Paths;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/upload")
public class uploadImage {

  // Xem ảnh
  @GetMapping("/{id}")
  public ResponseEntity<Resource> readImage(@PathVariable String id) throws IOException {
    String path = Paths.get(System.getProperty("user.dir"), "src/main/resources/static/images/" + id)
        .toString();

    File imageFile = new File(path);
    if (!imageFile.exists()) {
      return ResponseEntity.notFound().build();
    }

    try {
      Resource resource = new UrlResource(imageFile.toURI());
      if (resource.exists() && resource.isReadable()) {
        return ResponseEntity.ok()
            .contentType(MediaType.IMAGE_JPEG)
            .body(resource);
      } else {
        return ResponseEntity.notFound().build();
      }
    } catch (MalformedURLException e) {
      return ResponseEntity.notFound().build();
    }
  }

  // @PostMapping()
  // public ResponseEntity<?> uploadImageA(@RequestParam("file_to_upload")
  // MultipartFile file) throws IOException {
  // try {
  // String path = Paths.get(System.getProperty("user.dir"),
  // "src/main/resources/static/").toString();

  // File dir = new File(path, "images");
  // if (!dir.exists()) {
  // dir.mkdirs();
  // }
  // System.out.println(dir);
  // File uploadedFile = new File(dir, file.getOriginalFilename());
  // file.transferTo(uploadedFile);
  // return ResponseEntity.status(HttpStatus.OK).body(dir);

  // } catch (Exception e) {
  // return ResponseEntity.badRequest().body("Lỗi hình ảnh");

  // }
  // }

  @PostMapping()
  public ResponseEntity<?> uploadImageA(@RequestParam("file_to_upload") MultipartFile file) throws IOException {

    Map<String, String> response = new HashMap<>();

    if (file.isEmpty()) {
      response.put("error", "Please select a file to upload.");
      return ResponseEntity.badRequest().body(response);
    }

    try {
      String path = Paths.get(System.getProperty("user.dir"), "src/main/resources/static/").toString();

      File dir = new File(path, "images");
      if (!dir.exists()) {
        dir.mkdirs();
      }
      String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

      System.out.println(dir);
      File uploadedFile = new File(dir, uniqueFileName);
      file.transferTo(uploadedFile);

      response.put("destination", dir.toString());
      // response.put("encoding", file.getEncoding());
      response.put("fieldName", uniqueFileName);
      response.put("filename", file.getOriginalFilename());
      response.put("mimetype", file.getContentType());
      response.put("originalName", file.getOriginalFilename());
      response.put("path", "http://localhost:8081/api/upload/" + uniqueFileName);
      response.put("size", Long.toString(file.getSize()));

      return ResponseEntity.status(HttpStatus.OK).body(response);

    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Lỗi hình ảnh");

    }
  }

}
