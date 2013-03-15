thirdpartyjs
============

Step 1: Install Dependencies
npm install

Step 2: Add the domains to your /etc/hosts or some dns configuration

127.0.0.1       publisher.com
127.0.0.1       www.publisher.com
127.0.0.1       www.camerastork.com
127.0.0.1       camerastork.com

Step 3: Show any firewall rules you currently have
sudo ipfw show

Step 4: Add port forwarding rule (80 to 1337 for Node) 
sudo ipfw add 100 fwd 127.0.0.1,1337 tcp from any to any 80 in

If you want to remove your firewall rules run:
sudo ipfw flush

Step 5: Run app
node app.js

Step 6: Finally you can hit your browser with www.publisher.com