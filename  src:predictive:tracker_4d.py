import time
import math

class Quantara4DTracker:
    def __init__(self, history_limit=10):
        self.history_limit = history_limit
        # Stores historical scattering timelines: [(timestamp, amplitude)]
        self.temporal_matrix_history = []
        print("[4D Predictive Layer] Temporal timeline tracking active.")

    def log_3d_state_change(self, scattering_amplitude: float):
        """
        Phase 5: Logs 3D spatial changes along the 4th axis (Time t).
        Saves snapshot vectors to establish historical trajectories.
        """
        current_time = time.time()
        self.temporal_matrix_history.append((current_time, scattering_amplitude))
        
        # Keep tracking window restricted to performance safety limits
        if len(self.temporal_matrix_history) > self.history_limit:
            self.temporal_matrix_history.pop(0)

    def compute_hyper_spatial_trend(self):
        """
        Phase 5, Step 14: Simulates a simple hyper-spatial trend line 
        by analyzing time-series rate changes (velocity delta) of the QED math.
        """
        if len(self.temporal_matrix_history) < 2:
            return 0.0  # Needs at least two historical snapshots to map a vector delta

        # Calculate time and amplitude differences between earliest and latest logs
        t_initial, amp_initial = self.temporal_matrix_history[0]
        t_final, amp_final = self.temporal_matrix_history[-1]
        
        delta_time = t_final - t_initial
        if delta_time == 0:
            return 0.0
            
        # Calculate acceleration velocity of threat vectors across the timeline
        amplitude_velocity = (amp_final - amp_initial) / delta_time
        return amplitude_velocity

    def predict_future_bottleneck(self):
        """
        Analyzes the 4D field trend line. If attack velocities scale exponentially,
        it flags an imminent system anomaly to trigger preventative stabilization.
        """
        velocity = self.compute_hyper_spatial_trend()
        
        # High positive acceleration warns of a coordinated multi-vector exploit
        if velocity > 5.0:
            print(f"[4D WARNING] Threat intensity scaling up rapidly at {velocity:.4f} units/sec!")
            return "STABILIZE_ARRAY_TRIGGERED"
        
        print(f"[4D Stability] System trajectory tracking within nominal parameters. Velocity: {velocity:.4f}")
        return "STABLE"

# Mobile validation loop
if __name__ == "__main__":
    tracker = Quantara4DTracker()
    
    # Simulate the 3D bots sending threat feedback logs over a short duration
    print("Simulating threat matrix tracking sequence over time...")
    for mock_amplitude in [1.2, 2.5, 4.8, 9.1]:
        tracker.log_3d_state_change(mock_amplitude)
        time.sleep(0.2)
        
    status = tracker.predict_future_bottleneck()
    print(f"Ecosystem Status Evaluation: {status}")
