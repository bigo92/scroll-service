# scroll-service
Khi chuyển trang trong angular service sẽ tự động đánh dấu tọa độ trang hiện tại. khi bạn quay trở lại trang thì nó sẽ load lại tọa độ cũ. Cánh sử dụng.

1. Copy file scroll.service.ts trong thư mục: /_base/service/ vào dự án của bạn
2. Trong appComponent.ts import ScrollService và start service.

constructor( private sr: ScrollService ){} 
ngOnInit() { this.sr.start(); }
