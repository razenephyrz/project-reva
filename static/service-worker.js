self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Fokus tab baru atau buka sesuatu
    event.waitUntil(
      clients.openWindow('/')
    );
  });