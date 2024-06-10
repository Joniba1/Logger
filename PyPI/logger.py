import os
import json
import asyncio

class Logger:
    def __init__(self):
        self.log_path = ''
        self.is_running = False
        self.is_logging = False
        self.log_queue = []

    async def log_async(self, data):
        self.log_queue.append(data)
        if not self.is_logging:
            self.is_logging = True
            while self.log_queue:
                log_item = self.log_queue.pop(0)
                try:
                    with open(self.log_path, 'a') as file:
                        file.write(json.dumps(log_item) + '\n')
                except Exception as e:
                    print(e)
            self.is_logging = False

    def log(self, data):
        asyncio.run(self.log_async(data))

    @staticmethod
    def is_json(obj):
        try:
            json.dumps(obj)
            return True
        except Exception as e:
            return False

    async def logging_async(self):
        while self.is_logging:
            await asyncio.sleep(0.05)

    def logging(self):
        asyncio.run(self.logging_async())

    async def terminate_async(self):
        await self.logging_async()

        if not self.is_running:
            print('Logger is not running.')
            return

        self.is_running = False

        data = {
            'message': 'terminated'
        }

        await self.log_async(data)

    def terminate(self):
        asyncio.run(self.terminate_async())

    async def start_async(self, log_file_name, telemetry):
        await self.logging_async()

        if self.is_running:
            print('Terminate the logger before starting a new one')
            return
        elif not log_file_name or not telemetry:
            print('1 or more arguments are missing')
            return
        elif not self.is_json(telemetry):
            print('Invalid JSON')
            return

        log_dir = 'logs'
        os.makedirs(log_dir, exist_ok=True)  # Ensure directory creation

        self.log_path = os.path.join(log_dir, f'{log_file_name}.jsonl')

        if os.path.exists(self.log_path):
            print('File name already exists')
            return

        data = {
            'message': 'take-off',
            'telemetry': telemetry
        }

        await self.log_async(data)
        self.is_running = True

    def start(self, log_file_name, telemetry):
        asyncio.run(self.start_async(log_file_name, telemetry))

    async def initiate_service_async(self, service, telemetry):
        await self.logging_async()

        if not self.is_running:
            print('You must initialize a logger')
            return
        elif not service or not telemetry:
            print('1 or more arguments are missing')
            return
        elif not self.is_json(telemetry):
            print('Invalid JSON')
            return

        data = {
            'message': 'initiated-service',
            'service': service,
            'telemetry': telemetry
        }

        await self.log_async(data)

    def initiate_service(self, service, telemetry):
        asyncio.run(self.initiate_service_async(service, telemetry))

    async def terminate_service_async(self, service, telemetry):
        await self.logging_async()

        if not self.is_running:
            print('You must initialize the logger')
            return
        elif not service or not telemetry:
            print('1 or more arguments are missing')
            return
        elif not self.is_json(telemetry):
            print('Invalid JSON')
            return

        data = {
            'message': 'terminated-service',
            'service': service,
            'telemetry': telemetry
        }

        await self.log_async(data)

    def terminate_service(self, service, telemetry):
        asyncio.run(self.terminate_service_async(service, telemetry))

    async def event_async(self, service, bbox, telemetry):
        await self.logging_async()

        if not self.is_running:
            print('You must initialize the logger')
            return
        elif not service or not bbox or not telemetry:
            print('1 or more arguments are missing')
            return
        elif not self.is_json(bbox) or not self.is_json(telemetry):
            print('Invalid JSON')
            return

        data = {
            'message': 'event',
            'service': service,
            'bbox': bbox,
            'telemetry': telemetry
        }

        await self.log_async(data)

    def event(self, service, bbox, telemetry):
        asyncio.run(self.event_async(service, bbox, telemetry))

    async def error_async(self, service, err, telemetry):
        await self.logging_async()

        if not self.is_running:
            print('You must initialize the logger')
            return
        elif not service or not err:
            print('1 or more arguments are missing')
            return
        elif not self.is_json(telemetry):
            print('Invalid JSON')
            return

        data = {
            'message': 'error',
            'service': service,
            'error': err,
            'telemetry': telemetry
        }

        await self.log_async(data)

    def error(self, service, err, telemetry):
        asyncio.run(self.error_async(service, err, telemetry))
